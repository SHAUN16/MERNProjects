const mongoose = require('mongoose')

const UploadSchema  = new mongoose.Schema({
    file: {
        type: String,
        required: true,
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


module.exports = mongoose.model('Upload',UploadSchema)