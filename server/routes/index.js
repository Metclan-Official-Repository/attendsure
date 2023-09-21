const router = require("express").Router();
const attendanceRoutes = require("./attendance/index");
const departmentRoutes = require("./department/index");
const employeesRoutes = require("./employees/index");
const businessRoutes = require("./business");
const loginRoutes = require("./users/index");
const shiftRoutes = require("./shifts/");
const locationRoutes = require("./locations/index");
const employeeLocationRoutes = require("./employee_locations");
const rolesRoutes = require("./roles");
const reportsRoutes = require("./reports");
const countriesRoutes = require("./countries");
const verifyAuth = require("../middleware/authentication/index");

router.use("/attendance", verifyAuth, attendanceRoutes);
router.use("/business", businessRoutes);
router.use("/countries", countriesRoutes);
router.use("/departments", verifyAuth, departmentRoutes);
router.use("/employees", verifyAuth, employeesRoutes);
router.use("/employee-locations", verifyAuth, employeeLocationRoutes);
router.use("/locations", verifyAuth, locationRoutes);
router.use("/reports", verifyAuth, reportsRoutes);
router.use("/roles", verifyAuth, rolesRoutes);
router.use("/shift", verifyAuth, shiftRoutes);
router.use("/user", loginRoutes);

module.exports = router;
