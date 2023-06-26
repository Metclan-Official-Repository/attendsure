const fetchDepartmentsQuery = () => {
  return `
    SELECT * FROM departments;
  `;
};
const addDepartmentQuery = (name) => {
  return `
    INSERT INTO departments(name) 
    VALUES('${name}');
  `;
};
const editDepartmentQuery = (id, name) => {
  return `
    UPDATE TABLE departments 
        SET name = '${name}'
        WHERE id = ${id}
    `;
};
const deleteDepartmentQuery = () => {
  return `
        

    `;
};
module.exports = {
  addDepartmentQuery,
  editDepartmentQuery,
  deleteDepartmentQuery,
  fetchDepartmentsQuery,
};
