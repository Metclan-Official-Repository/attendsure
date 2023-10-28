"use strict";
const nodemailer = require("nodemailer");

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
async function registrationMail(businessName, email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.REGISTRATION_EMAIL, // sender address
    to: process.env.REGISTRATION_EMAIL, // list of receivers
    subject: "Attendsure Business Registration", // Subject line
    // text: `

    // `, // plain text body
    html: `
    <div> 
        <p> A new business registered with business name <strong> ${businessName}</strong> and email <a href="mailto:${email}">${email}</a> </p>
    </div>`,
  });
}

module.exports = registrationMail;
