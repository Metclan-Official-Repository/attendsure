const formidable = require("formidable");
const connection = require("../../config/mysql/index");
const {
  addDepartmentQuery,
  fetchDepartmentsQuery,
  deleteDepartmentQuery,
  editDepartmentQuery,
} = require("../../queries/department/index");

const fetchDepartments = (req, res) => {
  const form = formidable({
    multiples: true,
  });
  form.parse(req, (err, fields) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "failure", data: err });
    }
    const { id, name } = req.query;
    const businessId = req.businessId;
    connection.query(
      fetchDepartmentsQuery(id, name, businessId),
      (err, fields) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "failure", data: err });
        }
        res
          .status(200)
          .json({ success: true, message: "success", data: fields });
      }
    );
  });
};
const addDepartment = (req, res) => {
  const form = formidable({
    multiples: true,
  });
  form.parse(req, (err, fields) => {
    if (err) {
      return res
        .status(201)
        .json({ success: false, message: "failure", data: err });
    }
    const { name } = fields;
    const businessId = req.businessId;
    connection.query(addDepartmentQuery(name, businessId), (err, fields) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "failure", data: err });
      }
      res.status(201).json({ success: true, message: "success", ...fields });
    });
  });
};
const editDepartment = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  form.parse(req, (err, fields) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "failure", data: err });
    }
    const { id, name } = fields;
    const businessId = req.businessId;
    connection.query(
      editDepartmentQuery(id, name, businessId),
      (err, result) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "failure", data: err });
        }
        res
          .status(200)
          .json({ success: false, message: "success", data: result });
      }
    );
  });
};
const deleteDepartment = (req, res) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data
  form.parse(req, (err, fields) => {
    const { id } = fields;
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "failure", data: err });
    }
    const businessId = req.businessId;
    connection.query(deleteDepartmentQuery(id, businessId), (err, fields) => {
      if (err) {
        if (err.errno === 1451) {
          return res.status(401).json({
            success: false,
            message: "Delete all employees in this department first",
            data: err,
          });
        }
        return res
          .status(401)
          .json({ success: false, message: "An error occurred", data: err });
      }
      res.status(200).json({ success: true, message: "success", data: fields });
    });
  });
};

module.exports = {
  addDepartment,
  editDepartment,
  deleteDepartment,
  fetchDepartments,
};
