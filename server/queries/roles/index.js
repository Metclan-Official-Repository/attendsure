const addRoleQuery = (name, isAdmin, businessId, createdAt, updatedAt) => {
  return `
        INSERT INTO roles(name, is_admin, business_id, created_at, updated_at)
        VALUES('${name}', ${isAdmin}, ${businessId}, ${createdAt}, ${updatedAt})
    `;
};
const fetchRolesQuery = (businessId) => {
  return `
    SELECT * 
    FROM roles 
    WHERE business_id = ${businessId}
    ORDER BY name ASC;
  `;
};
module.exports = { addRoleQuery, fetchRolesQuery };
