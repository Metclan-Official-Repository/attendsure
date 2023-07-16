const addRoleQuery = (name, businessId, createdAt) => {
  return `
        INSERT INTO roles(name, business_id, created_at)
        VALUES('${name}', ${businessId}, ${createdAt})
    `;
};
module.exports = { addRoleQuery };
