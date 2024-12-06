import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white flex justify-between">
      <h2 className="mx-6 my-2 text-2xl font-sans font-semibold">
        Employee Management System
      </h2>
      <ul className="flex justify-evenly items-center basis-1/2">
        <li className="text-xl font-mono cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="text-xl font-mono cursor-pointer">
          <Link to="/add-employee">Add Employee</Link>
        </li>
        <li className="text-xl font-mono cursor-pointer">
          <Link to="/employees">View Employees</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
