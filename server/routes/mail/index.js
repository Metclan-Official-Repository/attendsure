const router = require("express").Router();
const { inquiryMail } = require("../../config/mail/inquiry");
router.post("/inquiry", inquiryMail);
module.exports = router;
