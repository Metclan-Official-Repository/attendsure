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
  sessionId
) => {
  return `
     INSERT INTO employees(first_name, last_name, middle_name, mobile, email, address, city, job_title, department_id, pin, image_is_set, image_url, is_checkedin, session_id)
     VALUES("${firstName}", "${lastName}", "${middleName}", "${mobile}", "${email}", "${address}", "${city}", "${jobTitle}", ${departmentId}, "${pin}", ${imageIsSet}, "${imageUrl}",${isCheckedIn}, ${sessionId})
    `;
};
const fetchEmployeeQuery = (id) => {
  return `
  SELECT *
  FROM employees
  `;
};

module.exports = {
  addEmployeeQuery,
  fetchEmployeeQuery,
};
