//importing hooks
import { useEffect, useState } from "react";
//importing functions
import { Routes, Route } from "react-router-dom";
//importing function
import jwt_decode from "jwt-decode";
//importing constants
import {
  proctedRoutes,
  protectedSettingsRoutes,
  protectedReportsRoutes,
  guestRoutes,
} from "./constants";
//import components
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components";
import {
  CheckIn,
  CheckOut,
  Dashboard,
  Delete,
  Login,
  ProtectedRoute,
  Reports,
  Settings,
  Signup,
} from "./pages";

//importing styles
import "./App.css";

function App() {
  const auth = localStorage.getItem("_token");
  const [userRoutes, setUserRoutes] = useState({
    settingsRoutes: [],
    appRoutes: [],
    reportsRoutes: [],
    guestRoutes: [],
  });
  const [showDelete, setShowDelete] = useState({
    item: "",
    enabled: false,
    action: "",
    id: "",
  });
  useEffect(() => {
    //show these routes if authenticated
    if (auth) {
      const decodedToken = jwt_decode(auth);
      const roles = decodedToken._roles;
      if (decodedToken._isAdmin) {
        setUserRoutes((prev) => ({
          ...prev,
          settingsRoutes: protectedSettingsRoutes,
          appRoutes: proctedRoutes,
          reportsRoutes: protectedReportsRoutes,
        }));
      } else {
        setUserRoutes((prev) => ({
          ...prev,
          settingsRoutes: proctedRoutes.filter((setting) => {
            return roles.find(({ name }) => {
              return name === setting.name;
            });
          }),
          appRoutes: proctedRoutes.filter((appRoute) => {
            return roles.find(({ name }) => {
              return name === appRoute.name;
            });
          }),
          reportsRoutes: proctedRoutes.filter((reports) => {
            return roles.find(({ name }) => {
              return name === reports.name;
            });
          }),
        }));
      }
    } else {
      setUserRoutes((prev) => ({ ...prev, guestRoutes: guestRoutes }));
    }
  }, []);
  return (
    <>
      <Navbar />
      {/* Render routes if authenticated */}
      {!auth && (
        <Routes>
          {userRoutes.guestRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      )}
      <Routes>
        {userRoutes.guestRoutes.map((route) => (
          <Route key={route.path} element={<route.element />} />
        ))}
      </Routes>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {userRoutes.appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element deleteItem={setShowDelete} />}
            />
          ))}
          {/*  Reports Routes */}
          <Route element={<Reports />}>
            {protectedReportsRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>

          {/* Setting Routes */}
          <Route element={<Settings />}>
            {userRoutes.settingsRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>

          <Route path={"/check-in"} element={<CheckIn />} />
          <Route path={"/check-out"} element={<CheckOut />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="*" element={<Dashboard />} /> */}
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
