const router = require("express").Router();
const {
  enrollFingerprint,
  fetchEmployeeFingerprint,
} = require("../../controllers/fingerprint");

router.get("/", fetchEmployeeFingerprint).post("/", enrollFingerprint);
module.exports = router;
