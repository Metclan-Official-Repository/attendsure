const router = require("express").Router();
const {
  addDepartment,
  fetchDepartments,
} = require("../../controllers/department/index");
router.get("/fetch", fetchDepartments).post("/new", addDepartment);
module.exports = router;
