const User = require('../models/User')
const Apply =require('../models/Applied')

const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let role


const register = async (req, res)=>{
    const users = await User.find({})
    if (users.length == 0){
     role = "admin"}
    else{role = "user"}
    const user = await User.create({...req.body,role})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{ name:user.name ,role:user.role,email:user.email,grade:user.grade}, token})
}



const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email||!password){
        throw new BadRequestError('Please provide the email and password')
        
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: { name: user.name , role:user.role,email:user.email ,grade:user.grade}, token})
}  

const updateUser = async(req,res)=>{
    const {email,name,grade} = req.body
    if(!email||!name||!grade){
        throw new BadRequestError('Please provide all the values')
        
    }
    const user = await User.findOne({_id: req.user.userId})
    user.email = email;
    user.name = name;
    user.grade = grade;

  await user.save();
  const token = user.createJWT();

  await Apply.updateMany({
    createdBy : req.user.userId,
},name,{new:true,runValidators:true})


res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      role:user.role,
      grade:user.grade,
    },token
  });
}  

const deleteUser = async (req,res) =>{
    const {
        params:{id:userId}
    } = req
    const user = await User.findOneAndDelete({
        _id : userId,
    })
    if(!user){
        throw new NotFoundError(`No user found with ${userId}`)
    }

    await Apply.deleteMany({
        createdBy : userId,
    })

    res.send(`User with ${userId} deleted`)
}


const getAllUsers = async (req,res) =>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users})
}


module.exports = {
    register,login,updateUser,deleteUser,getAllUsers
}