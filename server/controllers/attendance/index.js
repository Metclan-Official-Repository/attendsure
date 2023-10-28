const connection = require("../../config/mysql/index");
const formidable = require("formidable");
const {
  checkInQuery,
  setCheckinSession,
  checkOutQuery,
  removeSessionId,
  fetchPin,
  fetchAttendanceQuery,
} = require("../../queries/attendance/index");
const { fetchEmployeeQuery } = require("../../queries/employees");

const checkIn = (req, res) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data from request object
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failure",
        data: err,
      });
    }
    //extract employee and checkin time from fields
    const { employeeId, checkInTime, checkInMethod } = fields;
    const businessId = req.businessId;
    //check if this employee has an existing checkin in this location
    connection.query(
      fetchEmployeeQuery(employeeId, businessId),
      (err, results) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Failure",
            data: err,
          });
          return;
        }
        if (results["0"].is_checkedin) {
          res.status(200).json({
            success: false,
            message: "You're already checked in",
            code: 303,
          });
          return;
        } else {
          //begin a transaction
          connection.beginTransaction((err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failure",
                data: err,
              });
            }
            //first query is to insert employee id  with the checkin time into attendance table
            connection.query(
              checkInQuery(
                Number(employeeId),
                Number(checkInTime / 1000),
                results["0"].location_id,
                checkInMethod,
                Number(businessId)
              ),
              (err, result) => {
                if (err) {
                  connection.rollback(() => {
                    res.status(400).json({
                      success: false,
                      message: "Failure",
                      data: err,
                    });
                  });
                } else {
                  const sessionId = result.insertId;
                  //second is to edit the employee with the current checkin session
                  connection.query(
                    setCheckinSession(
                      Number(employeeId),
                      sessionId,
                      Number(businessId)
                    ),
                    () => {
                      if (err) {
                        connection.rollback(() => {
                          res.status(400).json({
                            success: false,
                            message: "Failure",
                            data: err,
                          });
                        });
                      } else {
                        connection.commit((err) => {
                          if (err) {
                            connection.rollback(() => {
                              res.status(400).json({
                                success: false,
                                message: "Failure",
                                data: err,
                              });
                            });
                          } else {
                            res.status(201).json({
                              success: true,
                              message: "Success",
                              code: 201,
                            });
                          }
                        });
                      }
                    }
                  );
                }
              }
            );
          });
        }
      }
    );
  });
};

const checkOut = (req, res) => {
  const form = formidable({
    multiples: true,
  });

  // Implement the check-out logic here
  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failure",
        data: err,
      });
    }
    const { userId, checkOutTime, sessionId } = fields;
    const businessId = req.businessId;
    //check if this employee has is already checkout in this location this location
    connection.query(
      fetchEmployeeQuery(Number(userId), Number(businessId)),
      (err, results) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Failure",
            data: err,
          });
          return;
        }
        if (results["0"].is_checkedin) {
          connection.beginTransaction((err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failure",
                data: err,
              });
            }
            connection.query(
              checkOutQuery(Number(sessionId), Number(checkOutTime / 1000)),
              (err, fields) => {
                if (err) {
                  connection.rollback(() => {
                    res.status(401).json({
                      success: false,
                      message: "Failure",
                      data: err,
                    });
                  });
                } else {
                  connection.query(
                    removeSessionId(Number(userId)),
                    (err, fields) => {
                      if (err) {
                        connection.rollback(() => {
                          res.status(401).json({
                            success: false,
                            message: "Failure",
                            data: err,
                          });
                        });
                      } else {
                        connection.commit((err) => {
                          if (err) {
                            connection.rollback(() => {
                              res.status(500).json({
                                success: false,
                                message: "Failure",
                                data: err,
                              });
                            });
                          } else {
                            res.status(201).json({
                              success: true,
                              message: "Success",
                            });
                          }
                        });
                      }
                    }
                  );
                }
              }
            );
          });
        } else {
          res.status(200).json({
            success: false,
            message: "You're already checked out",
            code: 303,
          });
          return;
        }
      }
    );
  });
};

const verifyPin = (req, res) => {
  const form = formidable({
    multiples: true,
  });

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failure",
        data: err,
      });
    }
    const { id } = req.query;
    connection.query(fetchPin(Number(id)), (err, fields) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Failure",
          data: err,
        });
      }
      const userPin = fields[0].pin;
      return res.status(200).json({
        success: true,
        message: "authorized",
        data: userPin,
      });
    });
  });
};
const fetchAttendance = (req, res) => {
  const form = formidable({
    multiples: true,
  });

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failure",
        data: err,
      });
    }
    connection.query(fetchAttendanceQuery(), (err, fields) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Failure",
          data: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "successful",
        data: fields,
      });
    });
  });
};
module.exports = {
  checkIn,
  checkOut,
  verifyPin,
  fetchAttendance,
};
