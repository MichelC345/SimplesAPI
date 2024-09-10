package com.simplesapi.funcionario.service;

import com.simplesapi.funcionario.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simplesapi.funcionario.model.Employee;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRep;

    public List<Employee> getAllEmployees() {
        return employeeRep.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        System.out.println("service recebeu " + id);
        return employeeRep.findById(id);
    }

    public void saveEmployee(@RequestBody Employee employee) {
        employeeRep.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRep.deleteById(id);
    }

    public void updateEmployee(Long id, Employee updatedEmp) {
        Employee emp = employeeRep.findById(id).orElseThrow();
        emp.setCPF(updatedEmp.getCPF());
        emp.setNome(updatedEmp.getNome());
        emp.setEmail(updatedEmp.getEmail());
        emp.setTelefone(updatedEmp.getTelefone());
        emp.setCargo(updatedEmp.getCargo());
        //emp.setDataEntrada(updatedEmp.getDataEntrada());
        emp.setDataEntrada(updatedEmp.getDataEntrada());

        employeeRep.save(emp);
        //return employeeRep.save(emp);
    }
}
