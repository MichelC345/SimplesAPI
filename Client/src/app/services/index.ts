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
  const data = await fetch("http://localhost:8080/api/funcionarios", {
    method: 'GET',
    cache: "force-cache",
  })

  return data.json();
};

export const createEmployee = async (emp: Employee): Promise<Employee[]> => {
  const data = await fetch(`http://localhost:8080/api/funcionarios`, {
    method: 'POST',
    cache: "force-cache",
    body: JSON.stringify({
      // Your data here
      emp
    }),
  })

  return data.json();
};

export const updateEmployee = async (id: number, emp: Employee): Promise<Employee[]> => {
  console.log(`o id é ${id}`);
  const data = await fetch(`http://localhost:8080/api/funcionarios/${id}`, {
    method: 'PUT',
    cache: "force-cache",
    body: JSON.stringify({
      // Your data here
      emp
    }),
  })

  return data.json();
};

export const deleteEmployee = async (id: number): Promise<Employee[]> => {
  console.log(`o id é ${id}`);
  const data = await fetch(`http://localhost:8080/api/funcionarios/${id}`, {
    method: 'DELETE',
    cache: "force-cache"
  })

  return data.json();
};