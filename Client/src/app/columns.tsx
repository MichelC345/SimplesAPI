"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Funcionario } from "@/types"

export const columns: ColumnDef<Funcionario>[] = [
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
    header: "Cargo"
  },
  {
    accessorKey: "data_entrada",
    header: "Data de Entrada",
  }
]