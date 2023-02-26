const Job = require('../models/Job')
const Apply =require('../models/Applied')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const mongoose = require('mongoose');

const getAllJobs = async (req,res)=>{
    const {search, sort, searchType} = req.query;
    let position;
    let company;
    let jobs;
    // const queryObject = {}
    const user = await User.findOne({_id :req.user.userId})
    
    if (search) {
        if(searchType == 'position'){
        position = { $regex: search, $options: 'i' };
        }

        if(searchType == 'company'){
            company = { $regex: search, $options: 'i' };
            }
  }
    if (position){
        if(sort === 'latest'){    
            jobs = await Job.find({position}).sort('-createdAt')
        }
              if (sort === 'oldest') {
                jobs = await Job.find({position}).sort('createdAt')
              }
              if (sort === 'a-z') {
                jobs = await Job.find({position}).sort('position')
              }
              if (sort === 'z-a') {
                jobs = await Job.find({position}).sort('-position')
              }
    }

    else  if(company){
        if(sort === 'latest'){    
            jobs = await Job.find({company}).sort('-createdAt')
        }
              if (sort === 'oldest') {
                jobs = await Job.find({company}).sort('createdAt')
              }
              if (sort === 'a-z') {
                jobs = await Job.find({company}).sort('position')
              }
              if (sort === 'z-a') {
                jobs = await Job.find({company}).sort('-position')
              }
    }

    else{
        jobs = await Job.find({}).sort('-createdAt')

          if (sort === 'oldest') {
            jobs = await Job.find({}).sort('createdAt')
          }
          if (sort === 'a-z') {
            jobs = await Job.find({}).sort('position')
          }
          if (sort === 'z-a') {
            jobs = await Job.find({}).sort('-position')
          }
    }
    currentDate = new Date() 

    if(user.role=="user"){
        jobs = jobs.filter(job => {
        if(job.deadline > currentDate && job.grade <= user.grade)
        {
            return job
        }
    })}

    res.status(StatusCodes.OK).json({jobs, count:jobs.length})

}
const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.json({job})
}

const getJob = async (req,res)=>{
    const {
        user:{userId}, 
        params:{id:jobId}
    } = req
  
    const job = await Job.findOne({
        _id : jobId,
    })
    if(!job){
        throw new NotFoundError(`No job found with ${_id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const updateJob = async (req,res)=>{
    //similar to getJob()
    const {
        user:{userId}, 
        params:{id:jId}
    } = req
    
    const job = await Job.findOneAndUpdate({
        _id : jId,
    },req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`No job found with ${_id}`)
    }

    // req.body.jobId = jId
    req.body.company = job.company
    req.body.position = job.position
    // req.body.name = req.user.name
    // req.body.createdBy = req.user.userId

    await Apply.updateMany({
        jobId : jId,
    },req.body,{new:true,runValidators:true})

    res.status(StatusCodes.OK).json({job})
    
}

const deleteJob = async (req,res)=>{
    const {
        user:{userId}, 
        params:{id:jId}
    } = req
    
    const job = await Job.findOneAndDelete({
        _id : jId,
    })
    if(!job){
        throw new NotFoundError(`No job found with ${_id}`)
    }
    await Apply.deleteMany({jobId:jId})

    res.send(`job with ${jId} deleted`)
}

const getRecommendedJobs = async (req,res) =>{
    const {
        user:{userId}, 
        params:{id:jobId}
    } = req

    

    const selectedJob = await Job.findOne({
        _id : jobId,
    })

    

    if(!selectedJob){
        throw new NotFoundError(`No job found with ${_id}`)
    }
    let recommendedJobs = await Job.find({
        jobType : selectedJob.jobType,  
    })
    
    recommendedJobs = recommendedJobs.filter(job =>{
        if (job.company != selectedJob.company || job.position != selectedJob.position){
            return job
        }

    })

    console.log(recommendedJobs)

    res.status(StatusCodes.OK).json({recommendedJobs})

}

module.exports = {
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    createJob,
    getRecommendedJobs,
}