const router = require("express").Router();
const {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
} = require("../../controllers/employee/index");
router
  .get("/fetch", fetchEmployee)
  .post("/new", addEmployee)
  .delete("/delete", deleteEmployee);

module.exports = router;
