const checkInQuery = (employeeId, checkInTime, businessId) => {
  return `
        INSERT INTO attendance(employee_id, check_in, check_out, business_id)
        VALUES(${employeeId}, ${checkInTime}, ${null}, ${businessId})
    `;
};
const setCheckinSession = (employeeId, sessionId) => {
  return `
    UPDATE employees 
    SET session_id = ${sessionId}, is_checkedin = ${1}
    WHERE id = ${employeeId}
  `;
};

const fetchPin = (id) => {
  return `
  SELECT pin FROM employees WHERE id = ${id}
  `;
};
const checkOutQuery = (id, checkOutTime) => {
  return `
    UPDATE attendance 
    SET check_out = ${checkOutTime} 
    WHERE id = ${id}
  `;
};
const removeSessionId = (id) => {
  return `
    UPDATE employees 
    SET is_checkedin = ${0}, session_id = ${0}
    WHERE id = ${id}
  `;
};
const fetchAttendanceQuery = () => {
  return `
  SELECT employees.first_name, employees.last_name, departments.name, attendance.*
  FROM attendance
  JOIN employees ON attendance.employee_id = employees.id
  JOIN departments ON employees.department_id = departments.id
  ORDER BY attendance.check_in DESC
  `;
};
module.exports = {
  checkInQuery,
  checkOutQuery,
  setCheckinSession,
  fetchPin,
  removeSessionId,
  fetchAttendanceQuery,
};
