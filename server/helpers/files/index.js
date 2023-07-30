const path = require("node:path");
const fs = require("node:fs");
const uploadDir = path.join(__dirname, "../..", "public", "files", "images");
const deleteFile = async (imageName) => {
  try {
    fs.rm(fs.join(uploadDir, imageName), (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    console.log("An error occurred", err);
  }
  //check if image is present in the file
};
module.exports = { deleteFile };
