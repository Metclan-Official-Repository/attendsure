//import connection
const connection = require("../../config/mysql");
//import query
const { attendanceSummaryQuery } = require("../../queries/reports");
const { rowCount } = require("../../queries/count");
//import helper functions
const { convertDateToTime } = require("../../helpers/functions");
const attendanceSummary = async (req, res) => {
  const businessId = req.businessId;
  const {
    currentPage,
    departmentId,
    shiftId,
    employeeId,
    locationId,
    from,
    to,
  } = req.query;
  const [fromDate, toDate] = [convertDateToTime(from), convertDateToTime(to)];
  const offset =
    parseInt(currentPage) > 1 ? (parseInt(currentPage) - 1) * 10 : 0;
  const attendanceQueryPromise = () =>
    new Promise((resolve, reject) => {
      connection.query(
        attendanceSummaryQuery(
          businessId,
          departmentId,
          shiftId,
          employeeId,
          locationId,
          fromDate,
          toDate,
          10,
          offset
        ),
        (err, fields) => {
          if (err) return reject(err.sqlMessage);
          connection.query(rowCount(), (err, count) => {
            if (err) return reject(err);
            resolve({ summary: fields, count: count });
          });
        }
      );
    });

  try {
    const result = await attendanceQueryPromise();
    res.status(200).json({
      success: true,
      data: result.summary,
      count: result.count["0"].total_count,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
module.exports = { attendanceSummary };
