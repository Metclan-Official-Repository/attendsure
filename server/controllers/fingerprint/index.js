const connection = require("../../config/mysql/");
const {
  fingeprintEnrollmentQuery,
  fetchEmployeeFingerprintData,
  resetFingerprint,
  fetchEmployeeFingerprintQuery,
} = require("../../queries/fingerprint");
const formidable = require("formidable");
const form = formidable({
  multiples: true,
});
const CREATED_AT = Date.now() / 1000;
const UPDATED_AT = Date.now() / 1000;
const enrollUserPromise = (fingers, employeeId, createdAt) =>
  new Promise(async (resolve, reject) => {
    try {
      const promises = fingers.map(
        (finger) =>
          new Promise((fingerResolve, fingerReject) => {
            connection.query(
              fingeprintEnrollmentQuery(
                finger.fingertemplate,
                finger.fingertype,
                employeeId,
                createdAt
              ),
              (err, result) => {
                if (err) {
                  fingerReject(err.sqlMessage);
                } else {
                  fingerResolve();
                }
              }
            );
          })
      );

      await Promise.all(promises);

      resolve("Employee's fingerprint was successfully enrolled");
    } catch (error) {
      reject(error);
    }
  });
const resetFingerprintPromise = (employeeId) =>
  new Promise((resolve, reject) => {
    connection.query(resetFingerprint(employeeId), (err, result) => {
      if (err) return reject(err.sqlMessage);
      resolve("Employee can enroll now");
    });
  });
const enrollFingerprint = (req, res) => {
  form.parse(req, async (err, fields) => {
    if (err) return res.status(400).json({ success: false, message: err });
    //extract the fingerprint information
    const { fingers, employeeId } = fields;
    try {
      //delete any previous enrollments for this user
      const employeeData = await resetFingerprintPromise(employeeId);
      //insert fingerprint data into the database
      const fingerprintResult = await enrollUserPromise(
        fingers,
        employeeId,
        CREATED_AT
      );
      return res
        .status(200)
        .json({ success: true, message: fingerprintResult });
    } catch (err) {
      res.status(400).json({ success: false, message: err });
    }
  });
};
const fetchEmployeeFingerprint = (req, res) => {
  const { employeeId } = req.query;
  if (isNaN(employeeId)) {
    res.status(400).json({
      success: false,
      message: "Please attach the employee's id to this request",
    });
    return;
  }
  connection.query(fetchEmployeeFingerprintQuery(employeeId), (err, result) => {
    if (err) {
      res.status(401).json({ success: false, message: err.sqlMessage });
      return;
    }

    const response = result.map((fingerprintData) => ({
      fingertemplate: fingerprintData.fingerprint_template,
      fingertype: fingerprintData.finger_type,
    }));
    return res.status(200).json({ success: true, data: response });
  });
};
module.exports = {
  enrollFingerprint,
  fetchEmployeeFingerprint,
};
