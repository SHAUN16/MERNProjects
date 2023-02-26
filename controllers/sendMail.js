const nodemailer = require('nodemailer');
require('dotenv').config();
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')

const sendEmail = async (req, res) => {
  const {msg} = req.body
  if (msg === "R"){  
  const { data:{user:{name,email}}} = req.body

  if (!email || !msg){
    throw new BadRequestError('Please provide the details')
  }

  const transporter = nodemailer.createTransport({
    host:'smtp-mail.outlook.com',
    port:587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  if (msg === "R"){
  let info = await transporter.sendMail({
    from: '"ADMIN" <shaunserrao16@outlook.com>',
    to: `${email}`,
    subject: 'Account Confirmationn',
    html: `<h2>Confirming Registration</h2><p>Details:<br>Name:${name},<br>Email:${email}<br></p>`,
  });
  console.log(info.response)
  res.json(info);
}
  }

  else{
    const { data:{apply:{company,position}}} = req.body

  const transporter = nodemailer.createTransport({
    host:'smtp-mail.outlook.com',
    port:587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  if (msg === "A"){
  let info = await transporter.sendMail({
    from: '"ADMIN" <shaunserrao16@outlook.com>',
    to: `${req.user.email}`,
    subject: 'Application Confirmationn',
    html: `<h2>Confirming Application</h2><p>Details:<br>Name:${req.user.name},<br>Email:${req.user.email}<br>,<br>Company:${company}<br>,<br>Position:${position}<br></p>`,
  });
  console.log(info.response)
  res.json(info);
}
  }
};

module.exports = {sendEmail};