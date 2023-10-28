const router = require("express").Router();
const {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
} = require("../../controllers/employee/index");
const { hasRemainingEmployeeSlots } = require("../../middleware/plan/index");
router
  .get("/fetch", fetchEmployee)
  .post("/new", hasRemainingEmployeeSlots, addEmployee)
  .put("/edit", editEmployee)
  .delete("/delete", deleteEmployee);

module.exports = router;
