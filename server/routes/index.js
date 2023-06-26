const router = require("express").Router();
const attendanceRoutes = require("./attendance/index");
const departmentRoutes = require("./department/index");
const employeesRoutes = require("./employees/index");
router.use("/attendance", attendanceRoutes);
router.use("/departments", departmentRoutes);
router.use("/employees", employeesRoutes);
module.exports = router;
