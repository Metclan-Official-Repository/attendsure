const addEmployeeQuery = (
  firstName,
  lastName,
  middleName,
  mobile,
  email,
  address,
  city,
  jobTitle,
  departmentId,
  pin,
  imageIsSet,
  imageUrl,
  isCheckedIn,
  shiftId,
  isActive,
  sessionId,
  employmentStatus,
  managerId,
  locationId,
  fingerPrintEnabled,
  qrCodeEnabled,
  businessId
) => {
  return `
     INSERT INTO employees(first_name, last_name, middle_name, mobile, email, address, city, job_title, department_id, pin, image_is_set, image_url, is_checkedin, shift_id, is_active, session_id, employment_status, manager_id,location_id, fingerprint_enabled, qrcode_enabled, business_id)
     VALUES("${firstName}", "${lastName}", "${middleName}", "${mobile}", "${email}", "${address}", "${city}", "${jobTitle}", ${departmentId}, "${pin}", ${imageIsSet}, "${imageUrl}",${isCheckedIn}, ${shiftId}, ${isActive}, ${sessionId}, "${employmentStatus}", ${managerId}, ${locationId}, ${fingerPrintEnabled}, ${qrCodeEnabled}, ${businessId})
    `;
};

const fetchEmployeeQuery = (
  id,
  businessId,
  fingerPrintEnabled,
  qrCodeEnabled
) => {
  let query = `SELECT *`;
  query += `
    FROM employees 
    WHERE business_id = ${businessId} 
  `;
  if (id) {
    query += ` AND id=${id} `;
  }
  if (parseInt(fingerPrintEnabled) === 1) {
    query += ` AND fingerprint_enabled = ${1} `;
  }
  if (parseInt(qrCodeEnabled) === 1) {
    query += ` AND qrcode_enabled = ${1} `;
  }
  query += ` ORDER BY employees.is_checkedin
  DESC `;
  return query;
};

const deleteEmployeeQuery = (id) => {
  return `
    DELETE FROM employees 
    WHERE id=${id}
  `;
};
const editEmployeeQuery = (
  id,
  firstName,
  lastName,
  middleName,
  mobile,
  email,
  address,
  city,
  jobTitle,
  departmentId,
  pin,
  imageIsSet,
  imageUrl,
  isCheckedIn,
  shiftId,
  isActive,
  sessionId,
  employmentStatus,
  managerId,
  businessId
) => {
  return `
    UPDATE employees
    SET first_name = '${firstName}', last_name='${lastName}', middle_name='${middleName}', mobile='${mobile}', email = '${email}', address='${address}', city='${city}', job_title='${jobTitle}', department_id='${departmentId}', pin='${pin}', image_is_set=${imageIsSet}, image_url = "${imageUrl}", is_checkedin=${isCheckedIn}, session_id = ${sessionId}, shift_id = ${shiftId}, is_active = ${isActive}, employment_status = "${employmentStatus}", manager_id = ${managerId}
    WHERE id = ${id} AND business_id = ${businessId}
  `;
};
const editEmployeeFingerprintQuery = (
  employeeId,
  fingerPrintEnabled,
  businessId
) => {
  return `
  UPDATE employees 
  SET fingerprint_enabled = ${fingerPrintEnabled}
  WHERE id = ${employeeId} && business_id = ${businessId}
  `;
};
const editEmployeePinQuery = (employeeId, pin, businessId) => {
  return `
    UPDATE employees 
    SET pin = ${pin}
    WHERE id = ${employeeId} && business_id = ${businessId}
  `;
};
const editEmployeeQrCodeQuery = (employeeId, qrCodeEnabled, businessId) => {
  return `
    UPDATE employees 
    SET qrcode_enabled = ${qrCodeEnabled}
    WHERE id = ${employeeId} && business_id = ${businessId}
  `;
};
const fetchOneEmployeeQuery = (employeeId, businessId) => {
  return `
    SELECT *, employees.id AS employeeId, employees.first_name AS e_firstname, employees.middle_name AS e_middlename, employees.last_name AS e_lastname, shifts.name AS shift_name, departments.name AS department_name, business_locations.name AS location_name, users.first_name AS m_firstname, users.last_name AS m_lastname
    FROM employees 
    JOIN shifts ON shifts.id = employees.shift_id
    JOIN departments ON departments.id = employees.department_id
    JOIN users ON users.id = employees.manager_id
    JOIN business_locations ON business_locations.id = employees.location_id
    WHERE employees.id = ${employeeId} AND employees.business_id = ${businessId}
  `;
};
module.exports = {
  addEmployeeQuery,
  fetchEmployeeQuery,
  editEmployeeQuery,
  deleteEmployeeQuery,
  editEmployeeFingerprintQuery,
  editEmployeePinQuery,
  editEmployeeQrCodeQuery,
  fetchOneEmployeeQuery,
};
