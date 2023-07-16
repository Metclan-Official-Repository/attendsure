require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const verifyAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const publicKey = fs.readFileSync("./keys/public_key.pem");
  if (bearerToken) {
    //extracting the token
    const token = bearerToken.split(" ")[1];

    //verifying the token
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        if ((err.name = "TokenExpiredError")) {
          return res
            .status(403)
            .json({ success: false, message: "Token expired", data: err });
        }
        return res
          .status(403)
          .json({ success: false, message: "Invalid token", data: err });
      }
      req.businessId = decoded._businessId;
      return next();
    });
    return;
  }
  return res.status(403).json({ success: false, message: "Unauthorized" });
};
module.exports = verifyAuth;
