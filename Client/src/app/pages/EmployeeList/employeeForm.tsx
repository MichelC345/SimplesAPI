import { Button } from '@/components/ui/button';
import CurrencyInput from '@/components/ui/CurrencyInput';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createEmployee, updateEmployee} from '@/app/services';
import { useToast } from '@/components/ui/use-toast';
import { queryKeys } from '@/services/queryKey.factory';
//import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';
import {Employee} from "@/types";
import { convertCurrencyToNumber, isAmountWithinRange, MAX_VALUE } from '@/utils/numberUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  accountNumber: z
    .string()
    .min(1, { message: 'Account number is empty' })
    .max(50, { message: 'Account number should be shorter than 50 characters' }),
  balance: z
    .string({
      required_error: 'Balance is empty',
    })
    .refine(
      (value) => {
        return isAmountWithinRange(convertCurrencyToNumber(value));
      },
      { message: `Balance should be between -${MAX_VALUE} and ${MAX_VALUE}` }
    ),
});

interface EmployeeProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  employee: Employee | null;
}

const EmployeeForm = ({ isOpen, onOpenChange, employee }: EmployeeProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: '',
    },
    mode: 'onChange',
  });

  const onCreateSuccess = async (newEmployee: Employee) => {
    await queryClient.setQueryData(queryKeys.fetchEmployees.all, (oldData?: Employee[]) => {
      if (oldData) {
        return [newEmployee, ...oldData];
      }
      return [newEmployee];
    });
    toast({
      description: 'Bank Account was added successfully.',
    });
    onOpenChange(false);
  };

  const onUpdateSuccess = async (updatedEmployee: Employee) => {
    await queryClient.setQueryData(queryKeys.fetchEmployees.all, (oldData?: Employee[]) => {
      if (oldData) {
        return oldData.map((Employee) =>
          Employee.id === updatedEmployee.id ? updatedEmployee : Employee
        );
      }
      return [updatedEmployee];
    });
    toast({
      description: 'Bank Account was updated successfully.',
    });
    onOpenChange(false);
  };

  const onRequestError = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    });
  };

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: onCreateSuccess,
    onError: onRequestError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...dto }: CreateEmployeeDto & { id: number }) => updateEmployee(id, dto),
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });

  useEffect(() => {
    if (Employee) {
      form.reset({
        accountNumber: Employee.accountNumber,
        balance: Employee.balance.toString(),
      });
    } else {
      form.reset();
    }
  }, [isOpen, Employee]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values: z.infer<typeof formSchema>) => {
    const createDto: CreateEmployeeDto = {
      accountNumber: values.accountNumber,
      balance: convertCurrencyToNumber(values.balance),
    };
    if (!Employee) {
      createMutation.mutate(createDto);
    } else {
      updateMutation.mutate({ ...createDto, id: Employee.id });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{Employee ? 'Update the bank account' : 'Create new bank account'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="cpf"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do Funcionário</FormLabel>
                  <FormControl>
                    <Input placeholder="13719713158835300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nome"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nome"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <CurrencyInput value={value} onValueChange={(value) => onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            disabled={!form.formState.isValid || createMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;