const router = require("express").Router();
const { registerBusiness } = require("../../controllers/business/index");
router.post("/register", registerBusiness);
module.exports = router;
