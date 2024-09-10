import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createEmployee, updateEmployee} from '@/app/services';
//import { BankAccount, CreateBankAccountDto } from '@/types/BankAccount.types';
import {Employee} from "@/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';


interface EmployeeProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  employee: Employee | null;
}

const EmployeeForm = ({ isOpen, onOpenChange, employee }: EmployeeProps) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      cpf: '',
      nome: '',
      cargo: '',
      email: '',
      telefone: '',
      dataEntrada: '',
    },
    mode: 'onChange',
  });

  const onCreateSuccess = async (newEmployee: Employee) => {
    /*await queryClient.setQueryData(queryKeys.fetchEmployees.all, (oldData?: Employee[]) => {
      if (oldData) {
        return [newEmployee, ...oldData];
      }
      return [newEmployee];
    });
    toast({
      description: 'Bank Account was added successfully.',
    }); */
    console.log("Funcionário cadastrado com sucesso!");
    onOpenChange(false);
  };

  const onUpdateSuccess = async (updatedEmployee: Employee) => {
    /*await queryClient.setQueryData(queryKeys.fetchEmployees.all, (oldData?: Employee[]) => {
      if (oldData) {
        return oldData.map((Employee) =>
          Employee.id === updatedEmployee.id ? updatedEmployee : Employee
        );
      }
      return [updatedEmployee];
    });
    toast({
      description: 'Bank Account was updated successfully.',
    }); */
    console.log("Funcionário atualizado com sucesso!");
    onOpenChange(false);
  };

  const onRequestError = () => {
    /*toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    }); */
    console.log("Ocorreu um erro na requisição.");
  };

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: onCreateSuccess,
    onError: onRequestError,
  });

  const updateMutation = useMutation({
    //mutationFn: ({ id, ...dto }: CreateEmployeeDto & { id: number }) => updateEmployee(id, dto),
    mutationFn: updateEmployee,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });

  useEffect(() => {
    if (employee) {
      form.reset({
        //accountNumber: Employee.accountNumber,
        //balance: Employee.balance.toString(),
        cpf: employee.cpf,
        nome: employee.nome,
        cargo: employee.cargo,
        email: employee.email,
        telefone: employee.telefone,
        dataEntrada: employee.dataEntrada,
      });
    } else {
      form.reset();
    }
  }, [isOpen, employee]);

  const onSubmit: SubmitHandler = (emp: Employee) => {
    /*const createDto: CreateEmployeeDto = {
        cpf: emp.cpf,
        nome: emp.nome,
        cargo: emp.cargo,
        email: emp.email,
        telefone: emp.telefone,
        dataEntrada: emp.data_entrada,
    }; */
    if (!employee) {
      //createMutation.mutate(createDto);
      createMutation.mutate(emp); //createEmployee receberá emp
    } else {
      //updateMutation.mutate({ ...createDto, id: employee.id });
      updateMutation.mutate(emp); //updateEmployee receberá emp e seu id correspondente
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{employee ? 'Atualizar funcionário' : 'Cadastrar funcionário'}</DialogTitle>
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
                    <Input placeholder="11 digitos" {...field} />
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
                    <Input placeholder="Ao menos 4 digitos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cargo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe um cargo válido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe um e-mail válido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="telefone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="O telefone deve ter 11 digitos" {...field} />
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