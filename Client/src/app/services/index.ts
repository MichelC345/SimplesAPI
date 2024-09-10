// src/services/index.ts
import { Employee } from "@/types";

/*
const updateData = async () => {
  const response = await fetch('/api/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Your data here
    }),
  });

  const result = await response.json();
  console.log(result);
};
*/

export const getEmployees = async (): Promise<Employee[]> => {
  console.log("executando getEmployees");
  const data = await fetch("http://localhost:8080/api/funcionarios", {
    method: 'GET',
    cache: "force-cache",
  })

  if (!data.ok) {
    const error = await data.text();
    console.error(`Erro ao exibir funcionários: ${error}`);
    throw new Error(error);
  }

  return data.json();
};

export const createEmployee = async (emp: Employee): Promise<Employee> => {
  emp.dataEntrada = new Date().toISOString();
  console.log(`tentando criar funcionário`, JSON.stringify(emp));
  const data = await fetch("http://localhost:8080/api/funcionarios", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //cache: "force-cache",
    /* "emp:" {}...}
    body: JSON.stringify({
      // Your data here
      emp
    }), */
    body: JSON.stringify(emp)
  })

  if (!data.ok) {
    const error = await data.text();
    console.error(`Erro ao criar funcionário: ${error}`);
    throw new Error(error);
  }

  return data.json();
};

export const updateEmployee = async (emp: Employee): Promise<Employee> => {
  console.log(`o id é ${emp.id}`);
  const data = await fetch(`http://localhost:8080/api/funcionarios/${emp.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    cache: "force-cache",
    body: JSON.stringify(emp),
  })

  if (!data.ok) {
    const error = await data.text();
    console.error(`Erro ao atualizar funcionário: ${error}`);
    throw new Error(error);
  }

  return data.json();
};

export const deleteEmployee = async (id: number) => {
  console.log(`o id é ${id}`);
  const data = await fetch(`http://localhost:8080/api/funcionarios/${id}`, {
    method: 'DELETE',
    cache: "force-cache"
  })

  if (!data.ok) {
    const error = await data.text();
    console.error(`Erro ao remover funcionário: ${error}`);
    throw new Error(error);
  }

  //return data.json();
};