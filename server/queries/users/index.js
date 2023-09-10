const addUserQuery = (
  firstName,
  lastName,
  email,
  phone,
  password,
  roleId,
  isOwner,
  createdAt,
  updatedAt,
  businessId
) => {
  return `
        INSERT INTO users(first_name, last_name, email, phone, password,role_id, is_owner, created_at, updated_at, business_id)
        VALUES("${firstName}", "${lastName}", "${email}", "${phone}", "${password}", ${roleId}, ${isOwner}, ${createdAt}, ${updatedAt}, ${businessId});
    `;
};

const findUserQuery = (email) => {
  return `
        SELECT *
        FROM users 
        WHERE users.email = '${email}'
    `;
};
const updateUserQuery = (
  id,
  firstName,
  lastName,
  email,
  phone,
  roleId,
  updatedAt,
  businessId
) => {
  return ` 
    UPDATE users 
    SET first_name = "${firstName}", last_name = "${lastName}", email = "${email}", phone = "${phone}", role_id = ${roleId}, updated_at = ${updatedAt}, business_id = ${businessId}
    WHERE id = ${id}
  `;
};
const fetchUsersQuery = (businessId) => {
  return `
  SELECT users.email, users.first_name, users.last_name, users.phone, users.id, roles.name
  FROM users 
  INNER JOIN roles
  ON roles.id = users.role_id 
  WHERE users.business_id = ${businessId}`;
};
module.exports = {
  findUserQuery,
  addUserQuery,
  updateUserQuery,
  fetchUsersQuery,
};
