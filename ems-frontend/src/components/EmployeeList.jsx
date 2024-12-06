import { useEffect, useState } from "react";
import { deleteEmployee, employeeList } from "../services/EmployeeService";
import { fields } from "../Data/FormData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    employeeList()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEdit = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const handleDelete = (id) => {
    deleteEmployee(id)
      .then((res) => {
        console.log(res.data);
        toast.success("Employee deleted successfully.", { autoClose: 2000 });
        // Update the employee list in the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
        setTimeout(() => navigator("/employees"), 2000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <main className="w-full h-[90vh] bg-gray-100 pt-8">
        <div className="w-[85%] m-auto max-w-5xl text-center bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold font-serif text-gray-800 py-4">
            Employee List
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mt-6">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 border border-blue-500 text-left">
                    Employee ID
                  </th>
                  <th className="py-3 px-4 border border-blue-500 text-left">
                    First Name
                  </th>
                  <th className="py-3 px-4 border border-blue-500 text-left">
                    Last Name
                  </th>
                  <th className="py-3 px-4 border border-blue-500 text-left">
                    Address
                  </th>
                  <th className="py-3 px-4 border border-blue-500 text-left">
                    Mobile No
                  </th>
                  <th className="py-3 px-4 border border-blue-500 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee, index) => (
                    <tr
                      className={`border border-gray-300 ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                      key={index}
                    >
                      <td className="py-3 px-4 text-left">{employee.id}</td>
                      {fields.map((field, i) => {
                        return (
                          <td key={i} className="py-3 px-4 text-left">
                            {employee[field]}
                          </td>
                        );
                      })}
                      <td className="py-3 px-4 flex justify-around">
                        <button
                          className="text-white bg-yellow-400 py-1 px-3 rounded-md font-semibold hover:bg-yellow-600"
                          onClick={() => handleEdit(employee.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-400 py-1 px-3 rounded-md font-semibold hover:bg-red-600"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-600">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployeeList;
