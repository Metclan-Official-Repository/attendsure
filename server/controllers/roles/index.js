const { addRoleQuery, fetchRolesQuery } = require("../../queries/roles");
const { addPermissionToRolesQuery } = require("../../queries/permissions");
const formidable = require("formidable");

const connection = require("../../config/mysql/");
function getTrueIDs(arrayOfObjects) {
  const trueIDs = [];

  for (const obj of arrayOfObjects) {
    for (const key in obj) {
      if (obj[key].state === true) {
        trueIDs.push(obj[key].id);
      }
    }
  }

  return trueIDs;
}

const addRole = (req, res, next) => {
  const form = formidable({
    multiples: true,
  });
  //parsing form data
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(400).json({ success: false, message: "failure", data: err });
      return;
    }
    const { name, permissions } = fields;
    const businessId = req.businessId;
    const createdAt = Date.now() / 1000;
    //values of the the permissions
    const permissionFields = Object.values(permissions);
    const selectedPermissions = getTrueIDs(permissionFields);
    const isAdmin = 0;
    connection.beginTransaction((err) => {
      if (err) {
        res.status(400).json({ success: false, message: "failure", data: err });
        return;
      }
      connection.query(
        addRoleQuery(name, isAdmin, Number(businessId), createdAt),
        (err, result) => {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "failure", data: err });
            connection.rollback();
            return;
          }
          const roleId = result.insertId;
          const insertPermission = () => {
            return new Promise((resolve, reject) => {
              selectedPermissions.forEach((permissionId) => {
                connection.query(
                  addPermissionToRolesQuery(Number(permissionId), roleId),
                  (err) => {
                    reject(err);
                    return;
                  }
                );
              });
              resolve("Inserted successfully");
            });
          };
          const insertPermissionPromise = insertPermission();
          insertPermissionPromise
            .then((message) => {
              connection.commit((err) => {
                if (err) {
                  throw Error("Error committing");
                }
              });
              res.status(201).json({ success: true, message: message });
            })
            .catch((err) => {
              console.log(err);
              connection.rollback();
              res.state(401).json({ success: false, message: err });
            });
        }
      );
    });
  });
};

const fetchRoles = (req, res, next) => {
  const businessId = req.businessId;
  connection.query(fetchRolesQuery(businessId), (err, result) => {
    if (err) {
      res.state(401).json({ success: false, message: err });
    }
    res.status(200).json({ success: true, message: "fetched", data: result });
  });
};

module.exports = { addRole, fetchRoles };
