const router = require("express").Router();
const {
  checkIn,
  checkOut,
  verifyPin,
  fetchAttendance,
} = require("../../controllers/attendance/index");
router
  .get("/verify-pin", verifyPin)
  .get("/fetch", fetchAttendance)
  .post("/check-in", checkIn)
  .put("/check-out", checkOut);

module.exports = router;
