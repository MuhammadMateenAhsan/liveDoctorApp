const mongoose = require('mongoose')

const doctorScheema = new mongoose.Schema({
    firstName:{
        type:String,
        require:[true,"FirstName is required"]
    },
    lastName:{
        type:String,
        require:[true,"LastName is required"]
    },
    phone:{
        type:String,
        require:[true,"Phone is required"]
    },
    email:{
        type:String,
        require:[true,"email is required"]
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        require:[true,"address is required"]
    },
    status:{
        type:String,
        default:"pending"
    },
    specialization:{
        type:String,
        require:[true,"specialization is required"]
    },
    experience:{
        type:String,
        require:[true,"experience is required"]
    },
    feesPerConsultation:{
        type:Number,
        require:[true,"Fees is required"]
    },
    timings:{
        type:Object,
        require:[true,"Work Timing is required"]
    },
},{ timestamps:true }
)

const doctorModel = mongoose.model("doctors",doctorScheema)
module.exports = doctorModel