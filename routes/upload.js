const express = require('express')
const router = express.Router();

const { uploadFileLink,getFileLink } = require('../controllers/uploads')

router.post('/',uploadFileLink)
router.get('/',getFileLink)

module.exports =  router;