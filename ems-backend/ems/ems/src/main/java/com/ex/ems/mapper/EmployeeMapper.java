package com.ex.ems.mapper;

import com.ex.ems.dto.EmployeeDto;
import com.ex.ems.entity.Employee;

public class EmployeeMapper {

    public static Employee mapEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getAddress(),
                employeeDto.getMobNo()
        );
    }

    public static EmployeeDto mapEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getAddress(),
                employee.getMobNo()
        );
    }

}
