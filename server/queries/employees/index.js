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
  businessId
) => {
  return `
     INSERT INTO employees(first_name, last_name, middle_name, mobile, email, address, city, job_title, department_id, pin, image_is_set, image_url, is_checkedin, shift_id, is_active, session_id, employment_status, business_id)
     VALUES("${firstName}", "${lastName}", "${middleName}", "${mobile}", "${email}", "${address}", "${city}", "${jobTitle}", ${departmentId}, "${pin}", ${imageIsSet}, "${imageUrl}",${isCheckedIn}, ${shiftId}, ${isActive}, ${sessionId}, "${employmentStatus}", ${businessId})
    `;
};
const fetchEmployeeQuery = (id, businessId) => {
  if (id) {
    return `
    SELECT *
    FROM employees
    WHERE business_id = ${businessId} AND id=${id}
    `;
  } else {
    return `
    SELECT *
    FROM employees
    WHERE business_id = ${businessId}
    `;
  }
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
  businessId
) => {
  return `
    UPDATE employees
    SET first_name = '${firstName}', last_name='${lastName}', middle_name='${middleName}', mobile='${mobile}', email = '${email}', address='${address}', city='${city}', job_title='${jobTitle}', department_id='${departmentId}', pin='${pin}', image_is_set=${imageIsSet}, image_url = ${imageUrl}, is_checkedin=${isCheckedIn}, session_id = ${sessionId}, shift_id = ${shiftId}, is_active = ${isActive}, employment_status = "${employmentStatus}"
    WHERE id = ${id} AND business_id = ${businessId}
  `;
};
module.exports = {
  addEmployeeQuery,
  fetchEmployeeQuery,
  editEmployeeQuery,
  deleteEmployeeQuery,
};
