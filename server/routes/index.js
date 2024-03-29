const router = require("express").Router();
const attendanceRoutes = require("./attendance/index");
const departmentRoutes = require("./department/index");
const employeesRoutes = require("./employees/index");
const businessRoutes = require("./business");
const loginRoutes = require("./users/index");
const fingerPrintRoutes = require("./fingerprint");
const shiftRoutes = require("./shifts/");

const locationRoutes = require("./locations/index");
const employeeLocationRoutes = require("./employee_locations");
const rolesRoutes = require("./roles");
const reportsRoutes = require("./reports");
const countriesRoutes = require("./countries");
const overviewRoutes = require("./overview");
const mailRoutes = require("./mail");
const verifyAuth = require("../middleware/authentication/index");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Metclan Attendsure. Everywhere good!!!",
  });
});
router.use("/attendance", verifyAuth, attendanceRoutes);
router.use("/business", businessRoutes);
router.use("/countries", countriesRoutes);
router.use("/departments", verifyAuth, departmentRoutes);
router.use("/employees", verifyAuth, employeesRoutes);
router.use("/employee-locations", verifyAuth, employeeLocationRoutes);
router.use("/fingerprint", verifyAuth, fingerPrintRoutes);
router.use("/locations", verifyAuth, locationRoutes);
router.use("/mail", mailRoutes);
router.use("/overview", verifyAuth, overviewRoutes);
router.use("/reports", verifyAuth, reportsRoutes);
router.use("/roles", verifyAuth, rolesRoutes);
router.use("/shift", verifyAuth, shiftRoutes);
router.use("/user", loginRoutes);
module.exports = router;
