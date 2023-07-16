const formidable = require("formidable");
const connection = require("../../config/mysql/index");
const {
  addShiftQuery,
  fetchShiftQuery,
  deleteQuery,
  editShiftQuery,
} = require("../../queries/shifts/index");
const addShift = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    const { name, startTime, endTime } = fields;
    const businessId = req.businessId;
    connection.query(
      addShiftQuery(name, startTime, endTime, businessId),
      (err, results) => {
        if (err) {
          res
            .status(401)
            .json({ success: false, message: "failure", data: err });
          return;
        }
        res.status(201).json({
          success: true,
          message: "Shift added successfully",
          data: results,
        });
        return;
      }
    );
  });
};

const fetchShift = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    const { id, name, startTime, endTime } = req.query;
    const businessId = req.businessId;
    connection.query(
      fetchShiftQuery(id, name, startTime, endTime, businessId),
      (err, result) => {
        if (err) {
          res
            .status(401)
            .json({ success: false, message: "failure", data: err });
          return;
        }
        res
          .status(200)
          .json({ success: true, message: "success", data: result });
      }
    );
  });
};
const deleteShift = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    const { id } = fields;
    const businessId = req.businessId;
    connection.query(deleteQuery(id, businessId), (err, results) => {
      if (err) {
        res.status(401).json({ success: false, message: "failure", data: err });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: "success", data: results });
    });
  });
};
const editShift = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  //parsing fom data
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(401).json({ success: false, message: "failure", data: err });
      return;
    }
    const { id, name, startTime, endTime } = fields;
    const businessId = req.businessId;
    connection.query(
      editShiftQuery(id, name, startTime, endTime, businessId),
      (err, results) => {
        if (err) {
          res
            .status(401)
            .json({ success: false, message: "failure", data: err });
          return;
        }
        res
          .status(200)
          .json({ success: true, message: "success", data: results });
      }
    );
  });
};

module.exports = { addShift, fetchShift, deleteShift, editShift };
