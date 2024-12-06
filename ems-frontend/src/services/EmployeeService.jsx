import axios from "axios";

const URL_PATH = "http://localhost:8080/api/ems/employees";

export const employeeList = () => axios.get(URL_PATH);

export const addEmployee = (employee) => axios.post(URL_PATH, employee);

export const getEmployee = (id) => axios.get(`${URL_PATH}/${id}`);

export const updateEmployee = (id, employee) =>
  axios.put(`${URL_PATH}/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${URL_PATH}/${id}`);
