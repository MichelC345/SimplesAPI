// src/services/index.ts
import { Funcionario } from "@/types";

const getUsers = async (): Promise<Funcionario[]> => {
  const data = await fetch("http://localhost:8080/api/funcionarios");

  return data.json();
};

export default getUsers;