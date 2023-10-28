const router = require("express").Router();
const {
  addLocation,
  fetchLocations,
  deleteLocations,
  editLocation,
  enableLocation,
  disableLocation,
} = require("../../controllers/locations/index");
const {
  hasRemainingBusinessLocationsSlots,
} = require("../../middleware/plan/index");
router
  .get("/fetch", fetchLocations)
  .post("/new", hasRemainingBusinessLocationsSlots, addLocation)
  .post("/delete", deleteLocations)
  .put("/edit", editLocation)
  .put("/enable", enableLocation)
  .put("/disable", disableLocation);
module.exports = router;
