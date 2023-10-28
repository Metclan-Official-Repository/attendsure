const connection = require("../../config/mysql");
const {
  totalPresentQuery,
  totalAbsentQuery,
  totalEmployeesQuery,
} = require("../../queries/overview");

const fetchTotalAbsentCount = (businessId) =>
  new Promise((resolve, reject) => {
    connection.query(totalAbsentQuery(businessId), (err, fields) => {
      if (err) return reject(err);
      resolve(fields);
    });
  });
const fetchTotalPresentCount = (businessId) =>
  new Promise((resolve, reject) => {
    connection.query(totalPresentQuery(businessId), (err, fields) => {
      if (err) return reject(err);
      resolve(fields);
    });
  });
const fetchTotalEmployeesCount = (businessId) =>
  new Promise((resolve, reject) => {
    connection.query(totalEmployeesQuery(businessId), (err, fields) => {
      if (err) return reject(err);
      resolve(fields);
    });
  });
const overviewSummary = (req, res) => {
  const businessId = req.businessId;
  Promise.all([
    fetchTotalPresentCount(businessId),
    fetchTotalAbsentCount(businessId),
    fetchTotalEmployeesCount(businessId),
  ])
    .then((values) => {
      const totalEmployeesPresent = values[0]["0"]["COUNT(*)"];
      const totalAbsentCount = values[1]["0"]["COUNT(*)"];
      const totalEmployeesCount = values[2]["0"]["COUNT(*)"];
      res.status(200).json({
        success: true,
        data: {
          totalEmployees: totalEmployeesCount,
          totalAbsentEmployees: totalAbsentCount,
          totalPresentEmployees: totalEmployeesPresent,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({ success: true, message: err });
    });
};
module.exports = { overviewSummary };
