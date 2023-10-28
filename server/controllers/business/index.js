//importing packages
const formidable = require("formidable");
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

//importing custom functions
const connection = require("../../config/mysql/index");
const businessRegistrationMail = require("../../config/mail/newBusiness/index");

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
  lastName: joi.string().min(3).allow("").optional(),
  phone: joi.string().min(2).allow("").optional(),
  email: joi.string().min(3).required().email(),
  password: joi.string().min(5).required(),
  countryId: joi.number().min(1).required(),
  city: joi.string().min(2).allow("").optional(),
  address: joi.string().min(0).max(100).allow("").optional(),
});
//constants
const CURRENT_PLAN = 0;
const CREATED_AT = Date.now() / 1000;
const ROLE = "ADMIN";
const IS_ADMIN = 1;
const IS_OWNER = 1;
const IS_ACTIVE = 1;
const DEPARTMENT = "JANITORS";
const LOCATION_CODE = "L1";

//Find users with the provided email
const findUserPromise = (email) =>
  new Promise((resolve, reject) => {
    connection.query(findUserQuery(email), (err, fields) => {
      if (err) {
        reject(err.sqlMessage);
        return;
      }
      resolve(fields);
    });
  });

//Add user a new user promise
const addUserPromise = (
  firstName,
  lastName,
  email,
  phone,
  password,
  roleId,
  isOwner,
  createdAt,
  updatedAt,
  businessId
) =>
  new Promise((resolve, reject) => {
    connection.query(
      addUserQuery(
        firstName,
        lastName,
        email,
        phone,
        password,
        roleId,
        isOwner,
        createdAt,
        updatedAt,
        businessId
      ),
      (err, fields) => {
        if (err) {
          connection.rollback();
          return reject(err.sqlMessage);
        }
        resolve(fields);
      }
    );
  });
//Add user a new business promise
const addBusinessPromise = (
  businessName,
  ownerId,
  currentPlan,
  createdAt,
  updatedAt
) =>
  new Promise((resolve, reject) => {
    connection.query(
      addBusinessQuery(
        businessName,
        ownerId,
        currentPlan,
        createdAt,
        updatedAt
      ),
      (err, fields) => {
        if (err) {
          connection.rollback();
          reject(err.sqlMessage);
          return;
        }
        resolve(fields);
      }
    );
  });
//Add default admin role
const addAdminRolePromise = (name, isAdmin, businessId, createdAt, updatedAt) =>
  new Promise((resolve, reject) => {
    connection.query(
      addRoleQuery(name, isAdmin, businessId, createdAt, updatedAt),
      (err, fields) => {
        if (err) {
          connection.rollback();
          reject(err.sqlMessage);
          return;
        }
        resolve(fields);
      }
    );
  });
//Update user's role ID and business ID
const updateUserDataPromise = (
  id,
  firstName,
  lastName,
  email,
  phone,
  roleId,
  updatedAt,
  businessId
) =>
  new Promise((resolve, reject) => {
    connection.query(
      updateUserQuery(
        id,
        firstName,
        lastName,
        email,
        phone,
        roleId,
        updatedAt,
        businessId
      ),
      (err, fields) => {
        if (err) {
          connection.rollback();
          reject(err.sqlMessage);
          return;
        }
        resolve(fields);
      }
    );
  });
//Add employee's default department
const addDepartmentPromise = (name, businessId, createdAt, updatedAt) =>
  new Promise((resolve, reject) => {
    connection.query(
      addDepartmentQuery(name, businessId, createdAt, updatedAt),
      (err, fields) => {
        if (err) {
          connection.rollback();
          reject(err.sqlMessage);
          return;
        }
        resolve(fields);
      }
    );
  });
//Add business' default location
const addLocationPromise = (
  name,
  address,
  city,
  country_id,
  locationUniqueName,
  isActive,
  businessId,
  createdAt,
  updatedAt
) =>
  new Promise((resolve, reject) => {
    connection.query(
      addLocationQuery(
        name,
        address,
        city,
        country_id,
        locationUniqueName,
        isActive,
        businessId,
        createdAt,
        updatedAt
      ),
      (err, fields) => {
        if (err) {
          connection.rollback();
          reject(err.sqlMessage);
          return;
        }
        resolve(fields);
      }
    );
  });

const registerBusiness = async (req, res) => {
  //meta data
  const updatedAt = Date.now() / 1000;
  const form = formidable({
    multiples: true,
  });
  form.parse(req, async (err, fields) => {
    //validating user input
    try {
      const { error } = await registerSchema.validateAsync(fields);
      if (error || err) {
        throw new Error(error);
      }
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
      //ensure this user doesn't exist
      const findUser = await findUserPromise(email);
      if (!findUser.length) {
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const registerBusinessPromise = () =>
          new Promise((resolve, reject) => {
            // MYSQL TRANSACTION
            connection.beginTransaction(async (err) => {
              if (err) {
                reject(err);
                return;
              }
              //Add user transaction
              try {
                const addUser = await addUserPromise(
                  firstName,
                  lastName,
                  email,
                  phone,
                  hashedPassword,
                  null,
                  IS_OWNER,
                  CREATED_AT,
                  null,
                  null
                );
                //Add business transaction
                const addBusiness = await addBusinessPromise(
                  businessName,
                  addUser.insertId,
                  CURRENT_PLAN,
                  CREATED_AT,
                  updatedAt
                );
                //Add role transaction
                const addRole = await addAdminRolePromise(
                  ROLE,
                  IS_ADMIN,
                  addBusiness.insertId,
                  CREATED_AT,
                  null
                );
                //Update user data transaction
                await updateUserDataPromise(
                  addUser.insertId,
                  firstName,
                  lastName,
                  email,
                  phone,
                  addRole.insertId,
                  updatedAt,
                  addBusiness.insertId
                );
                //Add default department
                await addDepartmentPromise(
                  DEPARTMENT,
                  addBusiness.insertId,
                  CREATED_AT,
                  null
                );
                //Add default location
                await addLocationPromise(
                  businessName,
                  address,
                  city,
                  countryId,
                  LOCATION_CODE,
                  IS_ACTIVE,
                  addBusiness.insertId,
                  CREATED_AT,
                  null
                );
                connection.commit((err) => {
                  if (err) {
                    throw new Error(err.sqlMessage);
                  }
                });
                resolve("Business added successfully");
              } catch (err) {
                connection.rollback();
                reject(err);
              }
            });
          });
        const result = await registerBusinessPromise();
        res.status(201).json({
          success: true,
          message: "Business added successfully",
          data: result,
        });
        await businessRegistrationMail(businessName, email);
      } else {
        throw new Error("Email already exists");
      }
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
      return;
    }
  });
};
module.exports = { registerBusiness };
