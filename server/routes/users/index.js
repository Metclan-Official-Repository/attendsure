const router = require("express").Router();
const { login, fetchUsers, addUser } = require("../../controllers/users/index");
const verifyAuth = require("../../middleware/authentication/");
router
  .get("/fetch", verifyAuth, fetchUsers)
  .post("/new", addUser)
  .post("/login", login);
module.exports = router;
