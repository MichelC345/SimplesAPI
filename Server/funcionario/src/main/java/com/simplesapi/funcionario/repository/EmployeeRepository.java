package com.simplesapi.funcionario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.simplesapi.funcionario.model.*;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}