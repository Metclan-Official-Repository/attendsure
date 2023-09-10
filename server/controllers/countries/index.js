const connection = require("../../config/mysql");
const { fetchCountriesQuery } = require("../../queries/countries");
const fetchCountries = (req, res) => {
  connection.query(fetchCountriesQuery(), (err, result) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: "An error occurred",
        data: err,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: result,
    });
  });
};

module.exports = { fetchCountries };
