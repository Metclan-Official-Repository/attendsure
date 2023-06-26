require("dotenv").config();
const mysql = require("mysql");
const createTables = require("../../queries/index");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
connection.connect((err) => {
  if (err) {
    console.log("there was an error in connection", err);
    return;
  }
  console.log("database successfully connected");
  connection.query(createTables(), (err, fields) => {
    if (err) {
      if (err.errno === 1064) {
        console.log("tables already exist");
      } else {
        console.log("there was an error creating tables", err.sqlMessage);
      }
      return;
    }
    console.log("tables created");
  });
});
module.exports = connection;
