const totalPresentQuery = (businessId) => {
  return `
        SELECT COUNT(*)
        FROM employees 
        WHERE employees.business_id = ${parseInt(businessId)} 
        AND employees.is_checkedin = ${1}

    `;
};
const totalAbsentQuery = (businessId) => {
  const query = `
    SELECT COUNT(*)
    FROM employees 
    WHERE employees.business_id = ${parseInt(businessId)} 
    AND employees.is_checkedin = ${0}`;
  return query;
};
const totalEmployeesQuery = (businessId) => {
  let query = `
    SELECT COUNT(*)
    FROM employees 
    WHERE employees.business_id = ${parseInt(businessId)}    
    `;
  return query;
};
module.exports = { totalPresentQuery, totalAbsentQuery, totalEmployeesQuery };
