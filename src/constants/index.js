import {
  Account,
  Attendance,
  Billing,
  CheckIn,
  CheckOut,
  Contact,
  Departments,
  Dashboard,
  EditDepartment,
  EditEmployee,
  EditShift,
  Employees,
  Home,
  Locations,
  NewDepartment,
  NewEmployee,
  NewShift,
  Pricing,
  Roles,
  Reports,
  EmployeeProfilePage,
  Shifts,
  Security,
  Summary,
  Users,
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
  { name: "Reports", path: "/reports", key: "reports.view" },
  { name: "Settings", path: "/settings", key: "settings.view" },
];
const guestNav = [
  {
    name: "Feedback",
    path: "https://attendsure.featurebase.app/",
    key: "feedback",
  },
  { name: "Pricing", path: "/pricing", key: "pricing.view" },
  { name: "Get in touch", path: "/contact", key: "contact" },
];
const guestRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/pricing",
    element: Pricing,
  },
  {
    path: "/contact",
    element: Contact,
  },
];
const proctedRoutes = [
  {
    path: "/",
    element: Dashboard,
    name: "dashboard.view",
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
    path: "/employees/:id",
    element: EmployeeProfilePage,
    name: "employee.view",
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
  {
    path: "/contact",
    element: Contact,
    name: "contact",
  },
];
const protectedReportsRoutes = [
  {
    path: "/reports",
    element: Attendance,
    name: "reports.attendance",
  },
  {
    path: "/reports/summary",
    element: Summary,
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

//reports table
const attentanceTable = [
  {
    id: 1,
    value: "FirstName",
    name: "First Name",
  },
  {
    id: 2,
    value: "LastName",
    name: "Last Name",
  },
  {
    id: 3,
    value: "CheckIn",
    name: "Check in date and time",
  },
  {
    id: 4,
    value: "CheckOut",
    name: "Check out date and time",
  },
  {
    id: 6,
    value: "Department",
    name: "Department",
  },
  {
    id: 7,
    value: "Shift",
    name: "Shift",
  },
  {
    id: 8,
    value: "CheckInMethod",
    name: "CheckInMethod",
  },
];
const summaryTableColumns = [
  {
    id: 1,
    value: "FirstName",
    name: "First Name",
  },
  {
    id: 2,
    value: "Last Name",
    name: "Last Name",
  },
  {
    id: 3,
    value: "ActiveDays",
    name: "Active Days",
  },
  {
    id: 4,
    value: "TotalHours",
    name: "Total Hours Worked",
  },
  {
    id: 5,
    value: "AbsentDays",
    name: "Absent Days",
  },
  {
    id: 6,
    value: "LateArrivals",
    name: "Late Arrivals",
  },
  {
    id: 7,
    value: "EarlyDepartures",
    name: "Early Departures",
  },
  {
    id: 8,
    value: "EarlyArrivals",
    name: "Early Arrivals",
  },
  {
    id: 9,
    value: "Department",
    name: "Department",
  },
];

export {
  employementStatuses,
  navLinks,
  proctedRoutes,
  protectedReportsRoutes,
  protectedSettingsRoutes,
  summaryTableColumns,
  attentanceTable,
  guestRoutes,
  guestNav,
};
