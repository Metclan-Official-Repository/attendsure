const addPermissionToRolesQuery = (permissionId, roleId) => {
  return ` 
        INSERT INTO permissions_of_roles(permission_id, role_id)
        VALUES(${permissionId}, ${roleId})
    `;
};
module.exports = { addPermissionToRolesQuery };
