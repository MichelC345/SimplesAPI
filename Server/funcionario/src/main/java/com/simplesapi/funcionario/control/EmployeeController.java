package com.simplesapi.funcionario.control;

import com.simplesapi.funcionario.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.simplesapi.funcionario.model.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/funcionarios") //em api/funcionarios, retorna a relação de funcionários
public class EmployeeController {

    @Autowired
    private EmployeeService empService;

    public boolean validateName(String name) {
        return name != null && name.length() >= 4;
    }

    public boolean validateCPF(String cpf) {
        return cpf != null && cpf.length() == 11;
    }

    public boolean validateEmail(String email) {
        return email != null && email.indexOf("@") > 0 && email.length() >= 8;
    }

    public boolean validatePhone(String phone) {
        return phone != null && phone.length() == 11;
    }

    public boolean validateRole(String role) {
        return role != null && (role.equals("Gerente") || role.equals("Administrador") || role.equals("Tesoureiro")
        || role.equals("Desenvolvedor") || role.equals("Suporte") || role.equals("Secretario"));
    }

    @GetMapping //listagem de todos os funcionários
    public List<Employee> getAllEmployees() {
        return empService.getAllEmployees();
    }

    @GetMapping("/{id}") //obtenção de um funcionário específico
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = empService.getEmployeeById(id);
        if (empService.getEmployeeById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return empService.getEmployeeById(id).map(ResponseEntity::ok).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}") //remoção de um funcionário
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id) {
        System.out.println("Received ID: " + id);
        if (empService.getEmployeeById(id).isEmpty()) {
            System.out.println("Funcionario de id " + id + " não existe");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não existente.");
        }
        empService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    //https://medium.com/@chandantechie/spring-boot-application-with-crud-operations-using-spring-data-jpa-and-mysql-23c8019660b1
    @PutMapping("/{id}") //edição de um funcionário
    public ResponseEntity<String> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee updatedEmp) {
        if (empService.getEmployeeById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não existente.");
        }
        //validação dos campos
        if (!validateName(updatedEmp.getNome())) {
            //return ResponseEntity.badRequest().build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O nome deve ter ao menos 4 caracteres.");
        }else if (!validateCPF(updatedEmp.getCPF())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O CPF deve ter 11 caracteres.");
        }else if (!validateEmail(updatedEmp.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O e-mail deve ser válido.");
        }else if (!validatePhone(updatedEmp.getTelefone())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O telefone deve ser válido.");
        }else if (!validateRole(updatedEmp.getCargo())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O cargo inserido é inválido.");
        }
        empService.updateEmployee(id, updatedEmp);
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário atualizado com sucesso!");
    }

    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        //validação dos campos
        if (!validateName(employee.getNome())) {
            //return ResponseEntity.badRequest().build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O nome deve ter ao menos 4 caracteres.");
        }else if (!validateCPF(employee.getCPF())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O CPF deve ter 11 caracteres.");
        }else if (!validateEmail(employee.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O e-mail deve ser válido.");
        }else if (!validatePhone(employee.getTelefone())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O telefone deve ser válido.");
        }else if (!validateRole(employee.getCargo())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O cargo inserido é inválido.");
        }

        empService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário cadastrado com sucesso!");
    }
}
