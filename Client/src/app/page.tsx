"use client"; // Ensure this component is a Client Component

import { useCallback, useMemo } from "react";
import { getColumns } from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
import { useEmployees } from "@/hooks/useEmployees"; // Import your custom hook
import { Employee } from "@/types";

export default function Home() {
  const { employees, loading, error } = useEmployees(); // Use the custom hook

  const onDelete = useCallback(
    (employee: Employee) => alert(`Botão de remover acionado para o funcionário de id ${employee.id}`),
    []
  );

  const onEdit = useCallback(
    (employee: Employee) => alert(`Botão de editar acionado para o funcionário de id ${employee.id}`),
    []
  );

  const columns = useMemo(() => getColumns({ onEdit, onDelete }), [onEdit, onDelete]);

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>Error: {error.message}</p>; // Display error state

  return (
    <main className="pagina">
      <div className="container1">
        <DataTable columns={columns} data={employees} />
      </div>
    </main>
  );
}