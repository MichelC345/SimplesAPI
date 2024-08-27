package com.simplesapi.funcionario.model;
import jakarta.persistence.Entity; //javax
import jakarta.persistence.Id; //javax
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import org.springframework.cglib.core.Local;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Entity
@Table(name = "funcionarios") //indica a tabela que estou querendo acessar
public class Funcionario {

    public DateFormat df;
    public Funcionario() {
        this.df = new SimpleDateFormat("dd/MM/yyyy"); //formatação de datas
    }

    @Id
    private Long id;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "data_entrada")
    private Date data_entrada;

    // Getters and Setters

    public String getCPF() {
        return this.cpf;
    }

    public String getNome() {
        return this.nome;
    }

    public String getEmail() {
        return this.email;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public String getCargo() {
        return this.cargo;
    }

    public String getDataEntrada() {
        return this.df.format(this.data_entrada);
    }
}