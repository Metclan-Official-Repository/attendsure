const addUserQuery = (
  firstName,
  lastName,
  email,
  phone,
  password,
  businessId
) => {
  return `
        INSERT INTO users(first_name, last_name, email, phone, password, business_id)
        VALUES('${firstName}', '${lastName}', '${email}', '${phone}', '${password}', ${businessId});
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
  firstName,
  lastName,
  email,
  phone,
  password,
  businessId,
  id
) => {
  return ` 
    UPDATE users 
    SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', phone = '${phone}', password = '${password}', business_id = ${businessId}
    WHERE id = ${id}
  `;
};
const fetchUsersQuery = (businessId) => {
  return `
  SELECT users.email, users.first_name, users.last_name, users.phone, users.id
  FROM users 
  WHERE business_id = ${businessId}`;
};
module.exports = {
  findUserQuery,
  addUserQuery,
  updateUserQuery,
  fetchUsersQuery,
};
