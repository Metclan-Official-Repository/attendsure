const router = require("express").Router();
const { fetchCountries } = require("../../controllers/countries");
router.get("/fetch", fetchCountries);
module.exports = router;
