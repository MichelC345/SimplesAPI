package com.simplesapi.funcionario.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;


@Entity
@Table(name = "funcionarios") //indica a tabela que estou querendo acessar
public class Employee {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO) // a cada nova inserção, o id será auto incrementado
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
    @JsonProperty("dataEntrada")
    private String dataEntrada;

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
        return this.dataEntrada;
    }

    public void setCPF(String cpf) {
        this.cpf = cpf;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public void setDataEntrada(String dataEntrada) {
        this.dataEntrada = dataEntrada;
    }
}