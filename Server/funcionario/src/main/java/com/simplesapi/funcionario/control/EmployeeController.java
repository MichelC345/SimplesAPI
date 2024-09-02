package com.simplesapi.funcionario.control;

import com.simplesapi.funcionario.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.CrossOrigin;
import com.simplesapi.funcionario.repository.EmployeeRepository;
import com.simplesapi.funcionario.model.*;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/funcionarios") //em api/funcionarios, retorna a relação de funcionários
public class EmployeeController {

    @Autowired
    private EmployeeService empService;

    @GetMapping //listagem de todos os funcionários
    public List<Employee> getAllEmployees() {
        return empService.getAllEmployees();
    }

    @GetMapping("/{id}") //obtenção de um funcionário específico
    public Employee getEmployeeById(@PathVariable Long id) {
        return empService.getEmployeeById(id).orElseThrow();
    }

    @DeleteMapping("/{id}") //remoção de um funcionário
    public void deleteEmployee(@PathVariable("id") Long id) {
        empService.deleteEmployee(id);
    }

    //https://medium.com/@chandantechie/spring-boot-application-with-crud-operations-using-spring-data-jpa-and-mysql-23c8019660b1
    @PutMapping("/{id}") //edição de um funcionário
    public Employee updateEmployee(@PathVariable("id") Long id, @RequestBody Employee updatedEmployee) {
        return empService.updateEmployee(id, updatedEmployee);
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return empService.saveEmployee(employee);
    }
}
