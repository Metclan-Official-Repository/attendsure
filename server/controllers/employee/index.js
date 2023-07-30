const connection = require("../../config/mysql/index");
const formidable = require("formidable");
const { join } = require("path");
const { rename, rm } = require("fs");
const uploadDir = join(__dirname, "../..", "public", "files", "images");
const { deleteFile } = require("../../helpers/files/index");
const {
  addEmployeeQuery,
  fetchEmployeeQuery,
  deleteEmployeeQuery,
  editEmployeeQuery,
} = require("../../queries/employees/index");

const {
  addEmployeeLocationQuery,
} = require("../../queries/employees_locations/");

const form = formidable({
  multiples: true,
  uploadDir: uploadDir,
});
//handle image upload promise
const imageUploadPromise = (file) => {
  return new Promise(async (resolve, reject) => {
    const fileObj = file["image"];
    if (fileObj.size > 0) {
      try {
        // Generate new file name and path
        const newFileName = `${Date.now()}${fileObj.originalFilename}`;
        const newFilePath = join(uploadDir, newFileName);
        // Rename and move the uploaded image file
        await renameAsync(fileObj.filepath, newFilePath);
        resolve(newFileName);
      } catch (err) {
        reject(err);
      }
    } else {
      // Delete the file if no image is uploaded
      rm(fileObj.filepath, (err) => {
        if (err) {
          reject(err);
        }
        resolve("default.png");
      });
    }
    function renameAsync(oldPath, newPath) {
      return new Promise((resolve, reject) => {
        // Rename file asynchronously
        rename(oldPath, newPath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  });
};
// handle file upload promise
const fileUploadPromise = (uploadImage, fields, businessId) => {
  return new Promise((resolve, reject) => {
    // Parse the form data and resolve the promise with the fields and image URL
    const {
      firstName,
      lastName,
      middleName,
      mobile,
      email,
      address,
      city,
      jobTitle,
      departmentId,
      shift,
      pin,
      managerId,
      employementStatus,
    } = fields;
    const imageIsSet = 0;
    const isCheckedIn = 0;
    const sessionId = null;
    const isActive = 1;
    connection.query(
      addEmployeeQuery(
        firstName,
        lastName,
        middleName,
        mobile,
        email,
        address,
        city,
        jobTitle,
        departmentId,
        pin,
        imageIsSet,
        uploadImage,
        isCheckedIn,
        shift,
        isActive,
        sessionId,
        employementStatus,
        managerId,
        businessId
      ),
      (err, fields) => {
        if (err) {
          reject(err);
        }
        resolve(fields);
      }
    );
  });
};
//add employee location promise
const addEmployeeLocationPromise = (locations, employeeId) => {
  return new Promise((resolve, reject) => {
    //handle one location
    if (typeof locations === "string") {
      connection.query(
        addEmployeeLocationQuery(employeeId, locations),
        (err, results) => {
          if (err) return reject();
          resolve(results);
        }
      );
    }
    //handle multiple locations
    if (typeof locations === "object") {
      locations.map((location) => {
        connection.query(
          addEmployeeLocationQuery(employeeId, location),
          (err, results) => {
            if (err) return reject();
          }
        );
      });
      return resolve("added");
    }
  });
};
const addEmployee = (req, res) => {
  const businessId = req.businessId;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "success", data: "failure" });
      return;
    }
    try {
      const uploadImage = await imageUploadPromise(files);
      const addEmployeePromise = await fileUploadPromise(
        uploadImage,
        fields,
        businessId
      );
      const locationPromise = await addEmployeeLocationPromise(
        fields.locations,
        addEmployeePromise.insertId
      );
      res
        .status(201)
        .json({ success: true, message: "success", data: locationPromise });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ success: false, message: "success", data: "failure" });
    }
  });
};
//edit employee location promise
const addEmployeeLocationPromiseEdit = (locations, employeeId) => {
  return new Promise((resolve, reject) => {
    //handle one location
    if (typeof locations === "string") {
      connection.query(
        addEmployeeLocationQuery(employeeId, locations),
        (err, results) => {
          if (err) return reject();
          resolve(results);
        }
      );
    }
    //handle multiple locations
    if (typeof locations === "object") {
      locations.map((location) => {
        connection.query(
          addEmployeeLocationQuery(employeeId, location),
          (err, results) => {
            if (err) return reject();
          }
        );
      });
      return resolve("added");
    }
  });
};

//handle image upload promise
const imageUploadPromiseEdit = (file, previousImageUrl) => {
  return new Promise(async (resolve, reject) => {
    const fileObj = file["image"];
    if (fileObj.size > 0) {
      try {
        // Generate new file name and path
        const newFileName = `${Date.now()}${fileObj.originalFilename}`;
        const newFilePath = join(uploadDir, newFileName);
        // Rename and move the uploaded image file
        await renameAsync(fileObj.filepath, newFilePath);
        resolve(newFileName);
      } catch (err) {
        reject(err);
      }
    } else {
      // Delete the file if no image was uploaded
      rm(fileObj.filepath, (err) => {
        if (err) {
          reject(err);
        }
        resolve(previousImageUrl);
      });
    }
    function renameAsync(oldPath, newPath) {
      return new Promise((resolve, reject) => {
        // Rename file asynchronously
        rename(oldPath, newPath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  });
};
// handle file upload promise
const fileUploadPromiseEdit = (uploadImage, fields, businessId) => {
  return new Promise((resolve, reject) => {
    // Parse the form data and resolve the promise with the fields and image URL
    const {
      id,
      firstName,
      lastName,
      middleName,
      mobile,
      email,
      address,
      city,
      jobTitle,
      departmentId,
      shift,
      pin,
      employementStatus,
      imageIsSet,
      isCheckedIn,
      managerId,
      sessionId,
      locations,
      isActive,
    } = fields;

    connection.query(
      editEmployeeQuery(
        id,
        firstName,
        lastName,
        middleName,
        mobile,
        email,
        address,
        city,
        jobTitle,
        departmentId,
        pin,
        imageIsSet,
        uploadImage,
        isCheckedIn,
        shift,
        isActive,
        sessionId,
        employementStatus,
        managerId,
        businessId
      ),
      (err, fields) => {
        if (err) {
          reject(err);
        }
        resolve(fields);
      }
    );
  });
};
const editEmployee = (req, res) => {
  const businessId = req.businessId;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "success", data: "failure" });
      return;
    }
    try {
      const uploadImage = await imageUploadPromiseEdit(files, fields.imageUrl);
      console.log(uploadImage);
      const addEmployeePromise = await fileUploadPromiseEdit(
        uploadImage,
        fields,
        businessId
      );
      const locationPromise = await addEmployeeLocationPromiseEdit(
        fields.locations,
        addEmployeePromise.insertId
      );
      console.log("done");
      res
        .status(201)
        .json({ success: true, message: "success", data: locationPromise });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ success: false, message: "success", data: "failure" });
    }
  });
};

const fetchEmployee = (req, res) => {
  form.parse(req, (err, fields) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "failure", data: err });
    }
    const { id } = req.query;
    const businessId = req.businessId;
    connection.query(
      fetchEmployeeQuery(Number(id), businessId),
      (err, fields) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "failure", data: err });
        }
        res
          .status(200)
          .json({ success: true, message: "success", data: fields });
      }
    );
  });
};

const deleteEmployee = (req, res) => {
  form.parse(req, (err, fields) => {
    const { id } = fields;
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "failure", data: err });
    }
    connection.query(deleteEmployeeQuery(id), (err, fields) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "An error occurred", data: err });
      }
      res.status(200).json({ success: true, message: "success", data: fields });
    });
  });
};
module.exports = {
  addEmployee,
  editEmployee,
  deleteEmployee,
  fetchEmployee,
};
