"use client"; // Ensure this component is a Client Component

import EmployeeTable from "@/app/pages/EmployeeList/employeeTable";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
//https://www.youtube.com/watch?v=26bSDD9IEG4
//https://www.youtube.com/watch?v=Pt3-5aPu1pE&ab_channel=CodeWithOsvaldas
//https://apidog.com/blog/next-js-put-request/

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client = {queryClient}>
      <EmployeeTable />
    </QueryClientProvider>
  )
}