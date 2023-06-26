const connection = require("../../config/mysql/index");
const formidable = require("formidable");
const { join } = require("path");
const { rename, rm } = require("fs");
const uploadDir = join(__dirname, "../..", "public", "files", "images");
const {
  addEmployeeQuery,
  fetchEmployeeQuery,
} = require("../../queries/employees/index");
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
const fileUploadPromise = (uploadImage, fields) => {
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
      pin,
    } = fields;
    const imageIsSet = 0;
    const isCheckedIn = 0;
    const sessionId = null;
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
        sessionId
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

const addEmployee = (req, res) => {
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res
        .status(400)
        .json({ success: false, message: "success", data: "failure" });
      return;
    }
    try {
      const uploadImage = await imageUploadPromise(files);
      const addEmployeePromise = await fileUploadPromise(uploadImage, fields);
      res
        .status(201)
        .json({ success: true, message: "success", data: addEmployeePromise });
    } catch (err) {
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
    connection.query(fetchEmployeeQuery(), (err, fields) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "failure", data: err });
      }
      res.status(200).json({ success: true, message: "success", data: fields });
    });
  });
};

const editEmployee = () => {};
const deleteEmployee = () => {};
module.exports = {
  addEmployee,
  editEmployee,
  deleteEmployee,
  fetchEmployee,
};
