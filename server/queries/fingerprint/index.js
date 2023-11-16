const fingeprintEnrollmentQuery = (
  fingerprintTemplate,
  fingerprintType,
  employeeId,
  createdAt
) => {
  return ` 
        INSERT INTO employees_fingerprint(fingerprint_template, finger_type, employee_id, create_at)
        VALUES("${fingerprintTemplate}", "${fingerprintType}", ${parseInt(
    employeeId
  )}, ${parseInt(createdAt)})
    `;
};

const fetchEmployeeFingerprintData = (employeeId) => {
  return ` 
        SELECT * 
        FROM employees_fingerprint
        WHERE employee_id = ${parseInt(employeeId)}
    `;
};
const resetFingerprint = (employeeId) => {
  return ` 
        DELETE FROM employees_fingerprint
        WHERE employees_fingerprint.employee_id = ${parseInt(employeeId)}
    `;
};
const fetchEmployeeFingerprintQuery = (employeeId) => {
  let query = `
  SELECT *
  FROM employees_fingerprint
  WHERE employees_fingerprint.employee_id = ${parseInt(employeeId)}
  `;
  return query;
};
module.exports = {
  fingeprintEnrollmentQuery,
  fetchEmployeeFingerprintData,
  resetFingerprint,
  fetchEmployeeFingerprintQuery,
};
