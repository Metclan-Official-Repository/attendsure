const router = require("express").Router();
//importing controllers
const {
  fetchEmployeeLocations,
} = require("../../controllers/employee_locatons/index");
router.get("/fetch", fetchEmployeeLocations);

module.exports = router;
