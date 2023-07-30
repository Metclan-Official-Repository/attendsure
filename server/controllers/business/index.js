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

//User input validation schema
const registerSchema = joi.object({
  businessName: joi.string().min(3).max(20).required(),
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  phone: joi.string().min(3).required(),
  email: joi.string().min(3).required().email(),
  password: joi.string().min(6).required(),
});

const registerBusiness = (req, res) => {
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
    const { businessName, phone, firstName, lastName, email, password } =
      fields;
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
          //Adding user
          connection.query(
            addUserQuery(
              firstName,
              lastName,
              email,
              phone,
              hashedPassword,
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
              const createdAt = Date.now() / 1000;
              connection.query(
                addBusinessQuery(businessName, ownerId, currentPlan, createdAt),
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

                  //updating user information and business id
                  const businessId = results2.insertId;
                  connection.query(
                    updateUserQuery(
                      firstName,
                      lastName,
                      email,
                      phone,
                      hashedPassword,
                      businessId,
                      ownerId
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

                      //adding admin roles
                      const adminRole = "Admin";
                      const isAdmin = 1;
                      const createAt = Date.now() / 1000;
                      connection.query(
                        addRoleQuery(adminRole, isAdmin, businessId, createAt),
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
