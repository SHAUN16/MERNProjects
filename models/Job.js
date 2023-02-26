const mongoose = require('mongoose')

const JobSchema  = new mongoose.Schema({
    company:{
       type:String,
       required:[true,'Please provide company'],
       maxlength:50 
    },

    position:{
        type:String,
        required:[true,'Please provide position'],
        maxlength:100 
     },

    deadline:{
        type:Date,
        required:[true, 'Please provide deadline date']
    },

    grade:{
        type:String,
        required:[true, 'Please provide the cutoff CGPA']
    },

    salary:{
        type:String,
        required:[true, 'Please provide compensation details']
    },

    jobType:{
        type:String,
    },

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
},
{
    timestamps:true
})


module.exports = mongoose.model('Job',JobSchema)