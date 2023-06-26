import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { ToastContainer } from "react-toastify";
import {
  Attendance,
  Login,
  Dashboard,
  CheckIn,
  CheckOut,
  Departments,
  Employees,
  NewEmployee,
  NewDepartment,
  EditEmployee,
} from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/departments/new" element={<NewDepartment />} />
        <Route path="/employees/new" element={<NewEmployee />} />
        <Route path="/employees/edit" element={<EditEmployee />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
