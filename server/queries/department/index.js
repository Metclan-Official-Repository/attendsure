const fetchDepartmentsQuery = (id, name, businessId) => {
  if (id && name) {
    return `
      SELECT * FROM departments
      WHERE business_id = ${businessId} AND id = ${Number(id)} AND name=${name};
    `;
  }
  if (id) {
    return `
      SELECT * FROM departments
      WHERE business_id = ${businessId} AND id = ${Number(id)};
      `;
  } else {
    return `
      SELECT * FROM departments
      WHERE business_id = ${businessId}
    `;
  }
};
const addDepartmentQuery = (name, businessId, createdAt, updatedAt) => {
  return `
    INSERT INTO departments(name, created_at, updated_at, business_id) 
    VALUES('${name}', ${createdAt}, ${updatedAt} ,${businessId})
  `;
};
const editDepartmentQuery = (id, name, businessId, updatedAt) => {
  return `
    UPDATE departments 
        SET name = '${name}', updated_at = ${updatedAt}
        WHERE id = ${Number(id)} AND business_id = ${businessId}
    `;
};
const deleteDepartmentQuery = (id, businessId) => {
  return `
    DELETE FROM departments
    WHERE id = ${id} AND ${businessId}
    `;
};
module.exports = {
  addDepartmentQuery,
  editDepartmentQuery,
  deleteDepartmentQuery,
  fetchDepartmentsQuery,
};
