"use strict";
const nodemailer = require("nodemailer");
const joi = require("@hapi/joi");
const formidable = require("formidable");
const form = formidable({
  multiples: true,
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.REGISTRATION_EMAIL,
    pass: process.env.REGISTRATION_EMAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function inquiryMail(req, res) {
  form.parse(req, async (err, fields) => {
    if (err) return res.status(400).json({ success: false, message: err });
    // validate user input
    const inquirySchema = joi.object({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(0).allow("").optional(),
      email: joi.string().min(3).required().email(),
      body: joi.string().min(3).max(100).allow("").optional(),
    });
    // send mail with defined transport object
    try {
      const { error } = await inquirySchema.validateAsync(fields);
      if (err) {
        console.log("the error is", err);
        throw new Error(error);
      }
      const { firstName, lastName, email, body } = fields;
      res.status(201).json({ success: true, message: "Message submitted" });
      await transporter.sendMail({
        from: process.env.REGISTRATION_EMAIL, // sender address
        to: `bluedonice@gmail.com`, // list of receivers
        subject: "Attendsure Inquiry", // Subject line
        html: `
        <div>
        <p> First name : <strong> ${firstName}</strong> </p>
        <p> Last name : <strong> ${lastName}</strong> </p>
        <p> Email : <a href="mailto:${email}"><strong>  ${lastName}</strong></a></p>
        <p> Body : <strong> ${body}</strong> </p>
                </div>
                `,
      });
    } catch (err) {
      console.log(err.details);
      res.status(400).json({ success: false, message: err });
    }
  });
}

module.exports = { inquiryMail };
