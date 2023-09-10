const addPermissionToRolesQuery = (permissionId, roleId) => {
  return ` 
        INSERT INTO permissions_of_roles(permission_id, role_id)
        VALUES(${permissionId}, ${roleId})
    `;
};
const fetchPermissionsQuery = (roleId) => {
  return `
  SELECT permissions.name
  FROM permissions_of_roles
  INNER JOIN
  permissions ON permissions_of_roles.permission_id = permissions.id
  WHERE role_id = ${roleId}
  `;
};
module.exports = { addPermissionToRolesQuery, fetchPermissionsQuery };
