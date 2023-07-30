const addRoleQuery = (name, isAdmin, businessId, createdAt) => {
  return `
        INSERT INTO roles(name, is_admin, business_id, created_at)
        VALUES('${name}', ${isAdmin}, ${businessId}, ${createdAt})
    `;
};
const fetchRolesQuery = (businessId) => {
  return `
    SELECT * 
    FROM roles 
    WHERE business_id = ${businessId}
  `;
};
module.exports = { addRoleQuery, fetchRolesQuery };
