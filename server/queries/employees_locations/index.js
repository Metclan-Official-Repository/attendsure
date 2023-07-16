const addEmployeeLocationQuery = (employeeId, locationId) => {
  return `
    INSERT INTO employee_locations(employee_id, location_id)
    VALUES(${employeeId}, ${locationId})
    `;
};
module.exports = { addEmployeeLocationQuery };
