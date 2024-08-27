//import Image from "next/image";
//https://dev.to/franciscolunadev82/getting-start-with-tables-using-nextjs-tanstack-table-and-typescript-2aig
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import getUsers from "@/app/services";

export default async function Home() {
  const data = await getUsers();

  return (
    <main className="pagina">
      <div className="container1">

        
        <DataTable columns={columns} data={data}/>

      </div>
    </main>
  );
}
