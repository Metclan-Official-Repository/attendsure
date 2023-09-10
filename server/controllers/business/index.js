//importing packages
const formidable = require("formidable");
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

//importing custom functions
const connection = require("../../config/mysql/index");

//importing queries
const {
  findUserQuery,
  addUserQuery,
  updateUserQuery,
} = require("../../queries/users/index");
const { addBusinessQuery } = require("../../queries/business/index");
const { addRoleQuery } = require("../../queries/roles/index");
const { addLocationQuery } = require("../../queries/locations");
const { addDepartmentQuery } = require("../../queries/department");
//User input validation schema
const registerSchema = joi.object({
  businessName: joi.string().min(3).max(20).required(),
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  phone: joi.string().min(3).required(),
  email: joi.string().min(3).required().email(),
  password: joi.string().min(6).required(),
  countryId: joi.number().min(1).required(),
  city: joi.string().min(2).max(50).required(),
  address: joi.string().min(2).max(100).required(),
});

const registerBusiness = (req, res) => {
  //meta data
  const createdAt = Date.now() / 1000;
  const updatedAt = Date.now() / 1000;
  const form = formidable({
    multiples: true,
  });
  form.parse(req, (err, fields) => {
    //validating user input
    const { error } = registerSchema.validateAsync(fields);
    if (error || err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    //ensure this user doesn't exist
    const {
      businessName,
      phone,
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      countryId,
    } = fields;
    connection.query(findUserQuery(email), async (err, fields) => {
      if (err) {
        res.status(401).json({ success: false, message: "failure", data: err });
        return;
      }
      if (!fields.length) {
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //MYSQL TRANSACTION
        connection.beginTransaction((err) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "transaction failed",
              data: err,
            });
            return;
          }
          //meta data
          const isOwner = 1;
          //Adding user
          connection.query(
            addUserQuery(
              firstName,
              lastName,
              email,
              phone,
              hashedPassword,
              null,
              isOwner,
              createdAt,
              null,
              null
            ),
            (err, result1) => {
              if (err) {
                res.status(401).json({
                  success: false,
                  message: "Error performing first transaction",
                  data: err,
                });
                connection.rollback();
                return;
              }

              //adding business
              const ownerId = result1.insertId;
              const currentPlan = "free";
              connection.query(
                addBusinessQuery(
                  businessName,
                  ownerId,
                  currentPlan,
                  createdAt,
                  updatedAt
                ),
                (err, results2) => {
                  if (err) {
                    res.status(401).json({
                      success: false,
                      message: "Error performing second transaction",
                      data: err,
                    });
                    connection.rollback();
                    return;
                  }
                  const businessId = results2.insertId;
                  //adding admin roles
                  const adminRole = "Admin";
                  const isAdmin = 1;
                  connection.query(
                    addRoleQuery(
                      adminRole,
                      isAdmin,
                      businessId,
                      createdAt,
                      null
                    ),
                    (err, result4) => {
                      if (err) {
                        res.status(401).json({
                          success: false,
                          message: "Error perfoming fourth transaction",
                          data: err,
                        });
                        connection.rollback();
                        return;
                      }
                      //updating user information and business id
                      const roleId = result4.insertId;
                      connection.query(
                        updateUserQuery(
                          ownerId,
                          firstName,
                          lastName,
                          email,
                          phone,
                          roleId,
                          updatedAt,
                          businessId
                        ),
                        (err, results3) => {
                          if (err) {
                            res.status(401).json({
                              success: false,
                              message: "Error perfoming third transaction",
                              data: err,
                            });
                            connection.rollback();
                            return;
                          }
                          //adding the user department
                          const departmentName = "Sales Reps";
                          connection.query(
                            addDepartmentQuery(
                              departmentName,
                              businessId,
                              createdAt,
                              null
                            ),
                            (err, result5) => {
                              if (err) {
                                res.status(401).json({
                                  success: false,
                                  message: "Error perfoming fifth transaction",
                                  data: err,
                                });
                                connection.rollback();
                                return;
                              }
                              //creating business location
                              const locationUniqueName = "BL1";
                              const isActive = 1;
                              connection.query(
                                addLocationQuery(
                                  businessName,
                                  address,
                                  city,
                                  countryId,
                                  locationUniqueName,
                                  isActive,
                                  businessId,
                                  createdAt,
                                  null
                                ),
                                (err, result6) => {
                                  if (err) {
                                    res.status(401).json({
                                      success: false,
                                      message:
                                        "Error perfoming sixth transaction",
                                      data: err,
                                    });
                                    connection.rollback();
                                    return;
                                  }
                                  //committing transaction
                                  connection.commit((err) => {
                                    if (err) {
                                      res.status(401).json({
                                        success: false,
                                        message: "Error committing transaction",
                                        data: err,
                                      });
                                      connection.rollback();
                                      return;
                                    }
                                    res.status(201).json({
                                      success: true,
                                      message: "Business added successfully",
                                      data: err,
                                    });
                                    return;
                                  });
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "User already exists", data: err });
      }
    });
  });
  //encrypt password
  //return error or success message
};

const login = () => {};
module.exports = { login, registerBusiness };
