const connection = require("../../config/mysql/index");
//importing queries
const {
  fetchEmployeeLocationsQuery,
} = require("../../queries/employees_locations");
const fetchEmployeeLocations = (req, res, next) => {
  const { employeeId } = req.query;
  connection.query(
    fetchEmployeeLocationsQuery(Number(employeeId)),
    (err, results) => {
      if (err) {
        res.status(401).json({ success: false, message: "failure", data: err });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: "success", data: results });
    }
  );
};
module.exports = { fetchEmployeeLocations };
