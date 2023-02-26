const express = require('express')
const router = express.Router();

const { sendEmail } = require('../controllers/sendMail')

router.post('/',sendEmail)

module.exports =  router;