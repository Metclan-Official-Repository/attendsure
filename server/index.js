require("dotenv").config();
require("./config/mysql/index");
require("./config/uploads/index");
const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const app = express();
//middleware
app.use(cors());
app.use(routes);
if (process.env.NODE_ENV === "development") {
  app.listen(5001, () => {
    console.log("server is listening");
  });
}
if (process.env.NODE_ENV === "production") {
  app.listen(() => {
    console.log("server is listening");
  });
}
