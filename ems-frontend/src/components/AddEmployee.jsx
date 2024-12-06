import { useEffect, useState } from "react";
import { TextFeild } from "./TextField";
import { fields } from "../Data/FormData";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobNo: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobNo: "",
  });

  const handleValidation = () => {
    const newError = {};
    if (!employee.firstName.trim()) {
      newError.firstName = "First Name is required";
    }
    if (!employee.lastName.trim()) {
      newError.lastName = "Last Name is required";
    }
    if (!employee.address.trim()) {
      newError.address = "Address is required";
    }
    if (!employee.mobNo.trim()) {
      newError.mobNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(employee.mobNo)) {
      newError.mobNo = "Invalid Mobile Number";
    }
    setError(newError);
    return newError;
  };

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((res) => {
        setEmployee(res.data);
      });
    } else {
      setEmployee({
        firstName: "",
        lastName: "",
        address: "",
        mobNo: "",
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = handleValidation();
    if (Object.keys(validationErrors).length === 0) {
      if (id) {
        updateEmployee(id, employee)
          .then((res) => {
            console.log(res.data);
            toast.success("Employee updated successfully!", {
              autoClose: 2000,
            });
            setTimeout(() => navigator("/employees"), 2000);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
          });
      } else {
        addEmployee(employee)
          .then((res) => {
            console.log(res.data);
            toast.success("Employee added successfully!", { autoClose: 2000 });
            setTimeout(() => navigator("/employees"), 2000);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
          });
      }
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="w-full h-[90vh] pt-8 bg-gray-100">
        <div className="add-emp w-[40%] m-auto max-w-lg bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl font-semibold font-sans text-gray-800 mb-6 text-center">
            {id ? "Edit" : "Add"} Employee
          </h2>
          <form method="post" onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field, i) => {
              return (
                <TextFeild
                  key={i}
                  field={field}
                  employee={employee}
                  setEmployee={setEmployee}
                  error={error[field]}
                />
              );
            })}
            <div className="btn">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
              >
                {id ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
