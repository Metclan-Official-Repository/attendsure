const formidable = require("formidable");
const connection = require("../../config/mysql/index");
const {
  addDepartmentQuery,
  fetchDepartmentsQuery,
} = require("../../queries/department/index");

const form = formidable({
  multiples: true,
});
const fetchDepartments = (req, res) => {
  form.parse(req, (err, fields) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "failure", data: err });
    }
    connection.query(fetchDepartmentsQuery(), (err, fields) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "failure", data: err });
      }
      res.status(200).json({ success: true, message: "success", data: fields });
    });
  });
};
const addDepartment = (req, res) => {
  form.parse(req, (err, fields) => {
    if (err) {
      return res
        .status(201)
        .json({ success: false, message: "failure", data: err });
    }
    const { name } = fields;
    connection.query(addDepartmentQuery(name), (err, fields) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "failure", data: err });
      }
      res.status(201).json({ success: true, message: "success", ...fields });
    });
  });
};
const editDepartment = () => {};
const deleteDepartment = () => {};

module.exports = {
  addDepartment,
  editDepartment,
  deleteDepartment,
  fetchDepartments,
};
