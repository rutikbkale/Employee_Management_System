import { AddEmployee } from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<AddEmployee />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
