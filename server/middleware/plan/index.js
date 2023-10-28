const connection = require("../../config/mysql/index");
//import queries
const { fetchLocationsCountQuery } = require("../../queries/locations");
const { totalEmployeesQuery } = require("../../queries/overview");
const { fetchBusinessPlan } = require("../../queries/business");
const hasRemainingEmployeeSlots = (req, res, next) => {
  const businessId = req.businessId;
  //fetch business plan
  connection.query(fetchBusinessPlan(businessId), (err, fields) => {
    if (err) {
      return res
        .status(400)
        .json({ success: true, message: "An error occurred" });
    }
    if (fields[0].current_plan === "FREE") {
      //verify that the user doesn't have more than 10 employees
      connection.query(totalEmployeesQuery(businessId), (err, fields) => {
        if (err) {
          return res
            .status(400)
            .json({ success: true, message: "An error occurred" });
        }
        if (fields["0"]["COUNT(*)"] > 9) {
          return res.status(402).json({
            success: false,
            message:
              "Your free account allows for a maximum allocation of 10 Employees",
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });
};
const hasRemainingBusinessLocationsSlots = (req, res, next) => {
  const businessId = req.businessId;
  //fetch business plan
  connection.query(fetchBusinessPlan(businessId), (err, fields) => {
    if (err) {
      return res
        .status(400)
        .json({ success: true, message: "An error occurred" });
    }
    if (fields[0].current_plan === "FREE") {
      //verify that the user doesn't have more than 2 business locations
      connection.query(fetchLocationsCountQuery(businessId), (err, fields) => {
        if (err) {
          return res
            .status(400)
            .json({ success: true, message: "An error occurred" });
        }
        if (fields["0"]["COUNT(*)"] > 1) {
          return res.status(402).json({
            success: false,
            message:
              "Your free account allows for a maximum allocation of 2 Business Locations.",
          });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });
};
module.exports = {
  hasRemainingEmployeeSlots,
  hasRemainingBusinessLocationsSlots,
};

//verify that the user can't check in with fingerprint
//verify that the user can't check in with qr code
//verify that the user can't add more than 1 user accounts
