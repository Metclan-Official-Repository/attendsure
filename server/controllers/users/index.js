require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const connection = require("../../config/mysql/index");
//importing queries
const { findUserQuery } = require("../../queries/users/index");
const login = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  const loginSchema = joi.object({
    email: joi.string().min(3).required().email(),
    password: joi.string().min(1).required(),
  });
  form.parse(req, (err, fields) => {
    //validating user input
    const { error } = loginSchema.validateAsync(fields);
    if (err || error) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    //verifying if user exists
    const { password, email } = fields;
    connection.query(findUserQuery(email), async (err, result) => {
      if (err) {
        res.status(401).json({ success: false, message: "failure", data: err });
        return;
      }
      if (result.length) {
        //Validating password
        const validatePassword = await bcrypt.compare(
          password,
          result[0].password
        );
        if (!validatePassword) {
          res
            .status(403)
            .json({ success: false, message: "Incorrect password", data: err });
          return;
        } else {
          //Generating tokens for authentication
          const claims = {
            sub: "attendee",
            _id: result[0].id,
            _businessId: result[0].business_id,
            _name: result[0].first_name,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          };
          const privateKey = fs.readFileSync("./keys/private_key.pem", "utf-8");
          const token = jwt.sign(claims, privateKey, {
            algorithm: "RS256",
          });
          res.header("authorization", token).json({
            success: true,
            message: "success",
            data: { token: token, _name: result[0].first_name },
          });
          return;
        }
      }
      res
        .status(404)
        .json({ success: false, message: "User not found", data: err });
    });
  });
};
module.exports = { login };
