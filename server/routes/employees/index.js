const router = require("express").Router();
const {
  addEmployee,
  fetchEmployee,
} = require("../../controllers/employee/index");
router.get("/fetch", fetchEmployee).post("/new", addEmployee);

module.exports = router;
