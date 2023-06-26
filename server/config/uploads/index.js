const { existsSync, mkdirSync } = require("fs");
const path = require("path");
//check if directory exists
const folder = path.join(__dirname, "../../", "public/files/images");
if (!existsSync(folder)) {
  mkdirSync(folder, {
    recursive: true,
  });
}
