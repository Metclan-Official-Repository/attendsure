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

const checkIn = (req, res) => {
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

    const { employeeId, checkInTime } = fields;
    const isCheckedIn = 1;
    connection.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failure",
          data: err,
        });
      }

      connection.query(
        checkInQuery(Number(employeeId), Number(checkInTime / 1000)),
        (err, result) => {
          if (err) {
            connection.rollback(() => {
              res.status(401).json({
                success: false,
                message: "Failure",
                data: err,
              });
            });
          } else {
            const sessionId = result.insertId;
            connection.query(setCheckinSession(employeeId, sessionId), () => {
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
            });
          }
        }
      );
    });
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
            connection.query(removeSessionId(Number(userId)), (err, fields) => {
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
            });
          }
        }
      );
    });
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
