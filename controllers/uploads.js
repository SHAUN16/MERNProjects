const User = require('../models/User')
const Upload = require('../models/Upload')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;


const uploadFileLink = async (req, res) => {
    const { result } = req.body
    await Upload.findOneAndDelete({
        createdBy:req.user.userId
    })
    const upload = await Upload.create({
        file:result.info.secure_url,
        createdBy:req.user.userId,
    })
    return res.status(StatusCodes.OK).json({upload});
  };

const getFileLink = async (req, res)=> {
    const upload = await Upload.findOne({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({upload})
}
module.exports = {
    uploadFileLink,
    getFileLink,
}