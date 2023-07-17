const addEmployeeLocationQuery = (employeeId, locationId) => {
  return `
    INSERT INTO employee_locations(employee_id, location_id)
    VALUES(${employeeId}, ${locationId})
    `;
};
const fetchEmployeeLocationsQuery = (employeeId) => {
  return `
        SELECT *
        FROM employee_locations
        JOIN business_locations ON business_locations.id = employee_locations.location_id
        WHERE employee_id = ${employeeId}
    `;
};
module.exports = { addEmployeeLocationQuery, fetchEmployeeLocationsQuery };
