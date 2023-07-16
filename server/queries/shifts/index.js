const addShiftQuery = (name, startTime, endTime, businessId) => {
  return `
        INSERT INTO shifts(name, start_time, end_time, business_id)
        VALUES('${name}', '${startTime}', '${endTime}', ${businessId})
    `;
};
const fetchShiftQuery = (id, name, startTime, endTime, businessId) => {
  if (id && name && startTime && endTime) {
    return `
    SELECT * FROM shifts
    WHERE business_id = ${businessId} AND id=${Number(
      id
    )} AND name=${name} AND start_time =${startTime} AND end_time = ${endTime}
    `;
  }

  if (id && name && startTime) {
    return `
    SELECT * FROM shifts
    WHERE business_id = ${businessId} AND id=${Number(
      id
    )} AND name=${name} AND start_time =${startTime}
    `;
  }
  if (id && name) {
    return `
    SELECT * FROM shifts
    WHERE business_id = ${businessId} AND id=${Number(id)} name=${name}
    `;
  }
  if (id) {
    return `
    SELECT * FROM shifts
    WHERE business_id = ${businessId} AND id=${Number(id)}
    `;
  } else {
    return `
      SELECT * FROM shifts
      WHERE business_id = ${businessId}
    `;
  }
};
const deleteQuery = (id, businessId) => {
  return `
    DELETE FROM shifts 
    WHERE business_id = ${businessId} AND id=${id}
  `;
};
const editShiftQuery = (id, name, startTime, endTime, businessId) => {
  return `
    UPDATE shifts
    SET name = '${name}', start_time ='${startTime}', end_time = '${endTime}'
    WHERE business_id = ${businessId} AND id = ${id}
  `;
};
module.exports = {
  addShiftQuery,
  fetchShiftQuery,
  deleteQuery,
  editShiftQuery,
};
