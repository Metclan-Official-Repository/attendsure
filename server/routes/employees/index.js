const router = require("express").Router();
const {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
} = require("../../controllers/employee/index");
router
  .get("/fetch", fetchEmployee)
  .post("/new", addEmployee)
  .put("/edit", editEmployee)
  .delete("/delete", deleteEmployee);

module.exports = router;
