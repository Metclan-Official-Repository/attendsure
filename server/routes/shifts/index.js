const router = require("express").Router();
const {
  addShift,
  fetchShift,
  deleteShift,
  editShift,
} = require("../../controllers/shifts");
router
  .get("/fetch", fetchShift)
  .post("/new", addShift)
  .delete("/delete", deleteShift)
  .put("/edit", editShift);

module.exports = router;
