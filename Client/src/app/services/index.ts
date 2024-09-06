// src/services/index.ts
import { Employee } from "@/types";

const getUsers = async (): Promise<Employee[]> => {
  const data = await fetch("http://localhost:8080/api/funcionarios", {cache: "force-cache"})

  return data.json();
};

export default getUsers;