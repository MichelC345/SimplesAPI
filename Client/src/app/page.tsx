//import Image from "next/image";
//https://dev.to/franciscolunadev82/getting-start-with-tables-using-nextjs-tanstack-table-and-typescript-2aig
//import { getColumns } from "./columns";
import {getColumns} from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
import getUsers from "@/app/services";
import { useCallback } from "react";
import { Employee } from "@/types";
import {useMemo} from 'react';

//console.log(getColumns);

export default async function Home() {
  const onDelete = useCallback (
    (employee: Employee) => alert(`Botão de remover acionado para o funcionário de id ${employee.id}`),
    []
  );
  
  const onEdit = useCallback (
    (employee: Employee) => alert(`Botão de editar acionado para o funcionário de id ${employee.id}`),
    []
  )
  
  const columns = useMemo(() => getColumns({onEdit, onDelete}), [onEdit, onDelete]);
  //const columns = useMemo(() => getBankAccountsColumns({ onEdit, onDelete }), []);

  const data = await getUsers();

  return (
    <main className="pagina">
      <div className="container1">

        
        <DataTable columns={columns} data={data}/>

      </div>
    </main>
  );
}
