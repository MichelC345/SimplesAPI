package com.simplesapi.funcionario.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.simplesapi.funcionario.repository.FuncionarioRepository;
import com.simplesapi.funcionario.model.*;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/funcionarios") //em api/funcionarios, retorna a relação de funcionários
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository FuncionarioRepository;

    @GetMapping
    public List<Funcionario> getAllFuncionarios() {
        System.out.println(FuncionarioRepository.findAll());
        return FuncionarioRepository.findAll();
    }
}
