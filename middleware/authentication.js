const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authUser = async (req,res,next)=>{
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Error')
    }

    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the job routes
        req.user = {userId:payload.userId,name:payload.name,role:payload.role,email:payload.email}
        
        next()
    }
    catch(err){
        throw new UnauthenticatedError('Authentication Error')
    }
}

const authRole = (req,res,next)=>{
           if (req.user.role !== "admin"){
            res.status(401)
            throw new UnauthenticatedError('Authorization Error')}

            next()
    }

module.exports = {
    authUser,
    authRole
}
