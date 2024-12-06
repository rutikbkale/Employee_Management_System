package com.ex.ems.service.impl;

import com.ex.ems.dto.EmployeeDto;
import com.ex.ems.entity.Employee;
import com.ex.ems.exception.ResourceNotFound;
import com.ex.ems.mapper.EmployeeMapper;
import com.ex.ems.repository.EmployeeRepository;
import com.ex.ems.service.EmployeeService;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		return EmployeeMapper.mapEmployeeDto(employeeRepository.save(EmployeeMapper.mapEmployee(employeeDto)));
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		return EmployeeMapper.mapEmployeeDto(employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFound("Employee does not exists with given employee Id:" + employeeId)));
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		return employeeRepository.findAll().stream().map((emp) -> EmployeeMapper.mapEmployeeDto(emp))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFound("Employee does not exists with given employee Id:" + employeeId));
		employee.setFirstName(employeeDto.getFirstName());
		employee.setLastName(employeeDto.getLastName());
		employee.setAddress(employeeDto.getAddress());
		employee.setMobNo(employeeDto.getMobNo());

		return EmployeeMapper.mapEmployeeDto(employeeRepository.save(employee));
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFound("Employee does not exists with given employee Id:" + employeeId));
		employeeRepository.deleteById(employeeId);
	}
}
