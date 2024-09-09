"use client"; // Ensure this component is a Client Component

import { useCallback, useMemo, useState } from "react";
import { getColumns } from "@/app/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { useEmployees } from "@/hooks/useEmployees"; // Import your custom hook
import { Employee } from "@/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from "@/app/services";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeForm from "./employeeForm";

//https://www.youtube.com/watch?v=26bSDD9IEG4
//https://www.youtube.com/watch?v=Pt3-5aPu1pE&ab_channel=CodeWithOsvaldas
//https://apidog.com/blog/next-js-put-request/

const EmployeeTable = () =>{
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { employees, loading, error } = useEmployees(); // Use the custom hook
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      //await queryClient.invalidateQueries({ queryKey: queryKeys.fetchBankAccounts.all });
      //console.log("sucesso");
      queryClient.defaultMutationOptions();
    },
  });

  const onDelete = useCallback((emp: Employee) => {
    console.log(`Botão de remover acionado para o funcionário de id ${emp.id}`);
    deleteMutation.mutate(emp.id, {
      onSuccess: () => {
        console.log("Funcionário deletado com sucesso.");
      },
      onError: () => {
        console.log("Ocorreu um erro na requisição.");
      }
    })},
    []
  );

  const onEdit = useCallback(
    (employee: Employee) => alert(`Botão de editar acionado para o funcionário de id ${employee.id}`),
    []
  );

  const columns = useMemo(() => getColumns({ onEdit, onDelete }), [onEdit, onDelete]);

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>Error: {error.message}</p>; // Display error state

  /*return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Relação de funcionários da Crypto</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <EmployeeForm
              isOpen={isDialogOpen}
              employee={selectedEmployee}
              onOpenChange={(value) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedEmployee(null);
                }
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable data={employees} columns={columns} />
      </CardContent>
    </Card>
    
  ); */
  return (
    <DataTable data={employees} columns={columns} />
  );
}

export default EmployeeTable;