const router = require("express").Router();
const { login } = require("../../controllers/users/index");
router.post("/login", login);
module.exports = router;
