const router = require("express").Router();
const attendanceRoutes = require("./attendance/index");
const departmentRoutes = require("./department/index");
const employeesRoutes = require("./employees/index");
const businessRoutes = require("./business");
const loginRoutes = require("./users/index");
const shiftRoutes = require("./shifts/");
const locationRoutes = require("./locations/index");
const verifyAuth = require("../middleware/authentication/index");

router.use("/attendance", verifyAuth, attendanceRoutes);
router.use("/departments", verifyAuth, departmentRoutes);
router.use("/employees", verifyAuth, employeesRoutes);
router.use("/shift", verifyAuth, shiftRoutes);
router.use("/locations", verifyAuth, locationRoutes);
router.use("/business", businessRoutes);
router.use("/user", loginRoutes);
module.exports = router;
