const router = require("express").Router();
const {
  addDepartment,
  fetchDepartments,
  deleteDepartment,
  editDepartment,
} = require("../../controllers/department/index");
router
  .get("/fetch", fetchDepartments)
  .post("/new", addDepartment)
  .put("/edit", editDepartment)
  .delete("/delete", deleteDepartment);
module.exports = router;
