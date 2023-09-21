const router = require("express").Router();
const { attendanceSummary } = require("../../controllers/reports");
router.get("/attendance-summary", attendanceSummary);

module.exports = router;
