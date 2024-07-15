const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port:587,
  secure:false,
  auth:{
    user:"fdisla1608@hotmail.com",
    pass:""
  }
});

module.exports = transporter;
