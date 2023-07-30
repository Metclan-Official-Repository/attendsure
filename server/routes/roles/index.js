const router = require("express").Router();
const { addRole, fetchRoles } = require("../../controllers/roles/");
router.get("/fetch", fetchRoles).post("/new", addRole);
module.exports = router;
