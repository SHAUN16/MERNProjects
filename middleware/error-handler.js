const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError = {
    //set default
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong'
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if ( err.code && err.code === 11000){
    customError.msg = `Value entered in ${Object.keys(err.keyValue)} field is already registered`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.name === 'ValidationError'){
    customError.statusCode = 400
  }

  if (err.name === 'CastError'){
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = 404
  }
  // return res.json({err})
  // console.log(err)
  return res.status(customError.statusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
