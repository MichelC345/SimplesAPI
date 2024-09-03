"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "@/types"
import DataTableRowActions from "@/components/ui/DataTableRowActions"

interface BankAccountsColumnsProps {
  onEdit: (emp: Employee) => void;
  onDelete: (emp: Employee) => void;
}

export const getColumns = ({onEdit, onDelete}: BankAccountsColumnsProps): ColumnDef<Employee>[] => [
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
  {
    accessorKey: "cargo",
    header: "Cargo",
  },
  {
    accessorKey: "dataEntrada",
    header: "Data de Entrada",
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
  },
];