package com.ex.ems.controller;

import com.ex.ems.dto.EmployeeDto;
import com.ex.ems.service.EmployeeService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ems/employees")
@AllArgsConstructor
public class EmployeeController {

	private EmployeeService employeeService;

	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
		return new ResponseEntity<EmployeeDto>(employeeService.createEmployee(employeeDto), HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
		System.out.println(employeeId);
		return ResponseEntity.ok(employeeService.getEmployeeById(employeeId));
	}

	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
		return ResponseEntity.ok(employeeService.getAllEmployees());
	}

	@PutMapping("/{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
			@RequestBody EmployeeDto employeeDto) {
		return ResponseEntity.ok(employeeService.updateEmployee(employeeId, employeeDto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
		employeeService.deleteEmployee(employeeId);
		return ResponseEntity.ok("Employee Deleted Successfully !");
	}

}
