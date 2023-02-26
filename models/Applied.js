const mongoose = require('mongoose')

const AppliedSchema  = new mongoose.Schema({
    jobId:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
        required:[true, 'Please select a job']

    },
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

    name:{
        type:String,
        required:[true,'Please provide name'],
        trim: true,
        minlength:3,
        maxlength:50
    },

    resume:{
        type:String,
        required:[true,'PLease upload the resume before submitting the application']
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


module.exports = mongoose.model('Apply',AppliedSchema)