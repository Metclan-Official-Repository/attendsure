//importing functions
import { Routes, Route } from "react-router-dom";
//import components
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components";
import {
  Account,
  Attendance,
  Billing,
  CheckIn,
  CheckOut,
  Dashboard,
  Delete,
  Departments,
  EditDepartment,
  EditEmployee,
  EditShift,
  Employees,
  Locations,
  Login,
  ProtectedRoute,
  NewDepartment,
  NewEmployee,
  NewShift,
  Security,
  Settings,
  Signup,
  Shifts,
} from "./pages";

//importing styles
import "./App.css";
import { useState } from "react";

function App() {
  const [showDelete, setShowDelete] = useState({
    item: "",
    enabled: false,
    action: "",
    id: "",
  });
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route
            path="/departments"
            element={<Departments deleteItem={setShowDelete} />}
          />
          <Route path="/departments/new" element={<NewDepartment />} />
          <Route path="/departments/edit" element={<EditDepartment />} />
          <Route
            path="/employees"
            element={<Employees deleteItem={setShowDelete} />}
          />
          <Route path="/employees/new" element={<NewEmployee />} />
          <Route path="/employees/edit" element={<EditEmployee />} />
          <Route element={<Settings />}>
            <Route path="/settings" element={<Account />} />
            <Route path="/settings/locations" element={<Locations />} />
            <Route path="/settings/security" element={<Security />} />
            <Route path="/settings/billing" element={<Billing />} />
          </Route>
          <Route
            path="/shifts"
            element={<Shifts deleteItem={setShowDelete} />}
          />
          <Route path="/shifts/new" element={<NewShift />} />
          <Route path="/shifts/edit" element={<EditShift />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
      {showDelete.enabled && (
        <Delete
          item={showDelete.item}
          deleteItem={setShowDelete}
          showDelete={showDelete}
        />
      )}
    </>
  );
}

export default App;
