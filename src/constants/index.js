import {
  Account,
  Attendance,
  Billing,
  CheckIn,
  CheckOut,
  Departments,
  Dashboard,
  EditDepartment,
  EditEmployee,
  EditShift,
  Employees,
  Locations,
  NewDepartment,
  NewEmployee,
  NewShift,
  Roles,
  Reports,
  Shifts,
  Users,
  Security,
} from "../pages";

const employementStatuses = [
  {
    title: "Full time",
    value: "fulltime",
  },
  {
    title: "Part time",
    value: "parttime",
  },
  {
    title: "Contract",
    value: "contract",
  },
];

const navLinks = [
  { name: "Dashboard", path: "/", key: "dashboard" },
  { name: "Employees", path: "/employees", key: "employees.view" },
  { name: "Departments", path: "/departments", key: "departments.view" },
  { name: "Shifts", path: "/shifts", key: "shifts.view" },
  { name: "Attendance", path: "/attendance", key: "attendance.view" },
  { name: "Reports", path: "/reports", key: "reports.view" },
  { name: "Settings", path: "/settings", key: "settings.view" },
];

const proctedRoutes = [
  {
    path: "/",
    element: Dashboard,
    name: "dashboard.view",
  },
  {
    path: "/attendance",
    element: Attendance,
  },
  {
    path: "/check-in",
    element: CheckIn,
  },
  {
    path: "/check-out",
    element: CheckOut,
  },
  {
    path: "/departments/new",
    element: NewDepartment,
    name: "departments.create",
  },
  {
    path: "/departments",
    element: Departments,
    name: "departments.view",
  },
  {
    path: "/departments/edit",
    element: EditDepartment,
    name: "departments.edit",
  },
  {
    path: "/employees",
    element: Employees,
    name: "employees.view",
  },
  {
    path: "/employees/new",
    element: NewEmployee,
    name: "employees.create",
  },
  {
    path: "/employees/edit",
    element: EditEmployee,
    name: "employees.edit",
  },
  {
    path: "/shifts/new",
    element: NewShift,
    name: "shifts.create",
  },
  {
    path: "/shifts/edit",
    element: EditShift,
    name: "shifts.edit",
  },
  {
    path: "/shifts",
    element: Shifts,
    name: "shifts.view",
  },
];
const protectedReportsRoutes = [
  {
    path: "/reports",
    element: Reports,
    name: "reports.summary",
  },
];
const protectedSettingsRoutes = [
  {
    path: "/settings",
    element: Account,
    name: "settings.account",
  },
  {
    path: "/settings/locations",
    element: Locations,
    name: "settings.locations",
  },
  {
    path: "/settings/roles",
    element: Roles,
    name: "settings.roles",
  },
  {
    path: "/settings/security",
    element: Security,
    name: "settings.security",
  },
  {
    path: "/settings/users",
    element: Users,
    name: "settings.users",
  },
  {
    path: "/settings/billing",
    element: Billing,
    name: "settings.billing",
  },
];
export {
  employementStatuses,
  navLinks,
  proctedRoutes,
  protectedReportsRoutes,
  protectedSettingsRoutes,
};
