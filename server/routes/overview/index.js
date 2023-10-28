const router = require("express").Router();
//import controllers
const { overviewSummary } = require("../../controllers/overview");
router.get("/summary", overviewSummary);
module.exports = router;
