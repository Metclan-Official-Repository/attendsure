const router = require("express").Router();
const {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
  editEmployeeFingerprint,
  fetchOneEmployee,
} = require("../../controllers/employee/index");
const { hasRemainingEmployeeSlots } = require("../../middleware/plan/index");
router
  .get("/fetch", fetchEmployee)
  .get("/fetch/:id", fetchOneEmployee)
  .post("/new", hasRemainingEmployeeSlots, addEmployee)
  .put("/edit", editEmployee)
  .put("/fingerprint/:id")
  .delete("/delete", deleteEmployee);

module.exports = router;
