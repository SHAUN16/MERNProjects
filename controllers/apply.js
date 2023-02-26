const Job = require('../models/Job')
const Apply = require('../models/Applied')
const Upload = require('../models/Upload')
const { canViewApply, scopedApplies,canDeleteApply} = require('../permissions/applied')

const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')


const getAllApplies = async (req,res)=>{
    const applies = await Apply.find({}).sort('createdAt')
    specificApplies =  scopedApplies(req.user, applies) 
    res.status(StatusCodes.OK).json({specificApplies, count:specificApplies.length})
}

// const getApplies = async (req,res)=>{
//     const {
//         user:{userId}, 
//     } = req
  
//     const applies = await Apply.find({createdBy:userId}).sort('createdAt')
//     if(!applies){
//         throw new NotFoundError(`No applies found for userId: ${userId}`)
//     }
//     res.status(StatusCodes.OK).json({applies})
// }

const getSpecificApply = async (req,res)=>{
    const {
        user:{userId}, 
        params:{id:jId}
    } = req
    const job = await Job.findOne({
        _id : jId,
    })
    
    if(!job){
        throw new NotFoundError(`No job found with id: ${jId}`)
    }
    const applies = await Apply.find({
        jobId : jId,
    })

    if(applies.length === 0){
        throw new NotFoundError(`No applies found for job ${jId}`)
    }
    res.status(StatusCodes.OK).json({applies})
}


const createApply = async (req,res)=>{
    const { 
        user:{userId},
        params:{id:jId }
    } = req
    const job = await Job.findOne({_id:jId})

    if(!job){
        throw new NotFoundError('Job Does Not Exist')
    }
    const existing = await Apply.findOne({jobId:jId,createdBy:userId})
    if(existing){
        return res.status(StatusCodes.OK).json({msg:'Already applied to job'})
    }
    const resume = await Upload.findOne({createdBy:req.user.userId})

    req.body.jobId = jId
    req.body.company = job.company
    req.body.position = job.position
    req.body.name = req.user.name
    req.body.createdBy = req.user.userId
    req.body.resume = resume.file
    const apply = await Apply.create(req.body)
    res.json({apply})
}


// const updateApply = async (req,res)=>{
//     //similar to getJob()
//     const {
//         user:{userId}, 
//         params:{id:jobId}
//     } = req
    
//     await Apply.findOneAndUpdate({
//         _id : jobId,
//     },req.body,{new:true,runValidators:true})
    
//     // res.status(StatusCodes.OK).json({apply})
//     return
// }

const deleteApply = async (req,res)=>{
    const {
        user:{userId}, 
        params:{id:applyId}
    } = req
    
    const apply = await Apply.findOne({
        _id : applyId,
    })
    if(!apply){
        throw new NotFoundError('Application not found')
    }
    if(!canDeleteApply(req.user,apply)){
        throw new UnauthenticatedError('You are not authorized to delete this application')
    }
     await Apply.findOneAndDelete({
        _id : applyId,
        createdBy: userId
    })

    res.send(`Apply with ${applyId} deleted`)
}

module.exports = {
    getAllApplies,
    getSpecificApply,
    deleteApply,
    createApply,
    // updateApply,
}