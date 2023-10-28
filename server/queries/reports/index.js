const attendanceSummaryQuery = (
  businessId,
  departmentId,
  shiftId,
  employeeId,
  locationId,
  from,
  to,
  limit,
  offset
) => {
  let query = `
        SELECT SQL_CALC_FOUND_ROWS
            a.*, 
            e.first_name, 
            e.last_name, 
            d.name AS department_name, 
            s.name AS shift_name, 
            s.start_time, 
            s.end_time
        FROM 
            attendance AS a
        LEFT JOIN 
            employees AS e ON a.employee_id = e.id
        LEFT JOIN 
            departments AS d ON e.department_id = d.id
        LEFT JOIN 
            shifts AS s ON e.shift_id = s.id
        WHERE 
            e.business_id = ${parseInt(businessId)}
            AND
            a.check_in >= ${parseInt(from)}            
            AND
            a.check_in <= ${parseInt(to)}
      `;
  if (parseInt(departmentId)) {
    query += ` AND e.department_id = ${parseInt(departmentId)}`;
  }
  if (parseInt(locationId)) {
    query += ` AND e.location_id = ${parseInt(locationId)}`;
  }
  if (parseInt(shiftId)) {
    query += ` AND e.shift_id = ${parseInt(shiftId)}`;
  }
  if (parseInt(employeeId)) {
    query += ` AND e.id = ${parseInt(employeeId)}`;
  }
  query += `
        ORDER BY 
            a.check_in DESC
        LIMIT 
            ${limit} OFFSET ${offset}
      `;

  return query;
};

module.exports = { attendanceSummaryQuery };
