require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const connection = require("../../config/mysql/index");
//importing queries
const {
  findUserQuery,
  fetchUsersQuery,
  addUserQuery,
} = require("../../queries/users/index");
const { fetchPermissionsQuery } = require("../../queries/permissions");
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
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    try {
      loginSchema.validate(fields);
    } catch (err) {
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
          //fetching permissions
          const roleId = result["0"].role_id;
          connection.query(fetchPermissionsQuery(roleId), (err, result1) => {
            if (err) {
              res.status(401).json({ success: false, message: err });
              return;
            }
            const roles = result1.map((role) => ({
              name: role.name,
            }));
            //Generating tokens for authentication
            const claims = {
              sub: "attendee",
              _id: result[0].id,
              _roles: roles,
              _businessId: result[0].business_id,
              _firstName: result[0].first_name,
              _lastName: result[0].last_name,
              _isAdmin: result[0].is_owner,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            };
            const privateKey = fs.readFileSync(
              "./keys/private_key.pem",
              "utf-8"
            );
            const token = jwt.sign(claims, privateKey, {
              algorithm: "RS256",
            });
            res.header("authorization", token).json({
              success: true,
              message: "success",
              data: { token: token, _name: result[0].first_name },
            });
            return;
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

const fetchUsers = (req, res, next) => {
  const businessId = req.businessId;
  connection.query(fetchUsersQuery(businessId), (err, result) => {
    if (err) {
      res.status(400).json({ success: false, message: "failure", data: err });
      return;
    }
    res.status(200).json({ success: true, message: "success", data: result });
  });
};
const addUser = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "failure",
        data: err,
      });
      return;
    }
    const { firstName, lastName, email, phone, password, roleId, locations } =
      fields;
    const businessId = req.businessId;
    const isOwner = 0;
    //first verify email isn't existent
    connection.query(findUserQuery(email), async (err, fields) => {
      if (err) {
        res.status(401).json({ success: false, message: "failure", data: err });
        return;
      }
      if (!fields.length) {
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdAt = Date.now() / 1000;
        connection.query(
          addUserQuery(
            firstName,
            lastName,
            email,
            phone,
            hashedPassword,
            roleId,
            isOwner,
            createdAt,
            null,
            businessId
          ),
          (err, result) => {
            if (err) {
              res.status(404).json({
                success: false,
                message: "failure",
                data: err,
              });
              return;
            }
            res.status(201).json({ success: false, message: "User inserted" });
          }
        );
      } else {
        res.status(409).json({
          success: false,
          message: "User already exists",
          data: err,
        });
        return;
      }
    });
  });
};
module.exports = { login, fetchUsers, addUser };
