const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const doctorModel = require("../models/doctorModel")
const appointmentModel = require("../models/appointmentModel")

const registerController = async(req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser) {
            return res.status(200).send({success:false,message:"user already exist"})
        }
        // password hashing
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)
        req.body.password = hashpassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:"Register successfuly!",success:true})

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:`Register Controller ${error.message}`})
    }
}

const loginController = async(req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:"user not found",success:false})
        }
        // to decrypt the hashed password and match with current logging password
        const isMatch = await bcrypt.compare(req.body.password, user.password) 
        if(!isMatch){
            return res.status(200).send({message:"Invalid email or Password!", success:false})
        }

         // generate a jwt 
         const token = jwt.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:'1d'})
         res.status(200).send({message:"Login Success", success:true, token})

    } catch (error) {
        console.log(error)
        res.status(500).send({message:`error in user login CTRL ${error.message}`})
    }
}

// for auth
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId }); // Corrected query
        user.password = undefined;
        console.log(user)
  
      if (!user) {
        return res.status(200).send({
          message: "User not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Auth error",
        error,
      });
    }
  };

  const applyDoctorController = async(req ,res)=>{
    try {
      const newDoctor = await doctorModel({...req.body,status:"pending"})
      await newDoctor.save()

      const adminUser = await userModel.findOne({isAdmin:true})
      const notification = adminUser.notification
      notification.push({
        type:"apply doctor request",
        message:`${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
        data:{
          doctorId: newDoctor._id,
          name: newDoctor.firstName +" "+ newDoctor.lastName,
          onClickPath:'/admin/doctors'
        }
      })

      await userModel.findByIdAndUpdate(adminUser._id,{notification})
      res.status(201).send({
        success:true,
        message:"Doctor Account Applied Successfully"
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        error,
        message:"Error while applying for doctor"
      })
    }
  }
  
  const getAllNotificationController = async(req,res) => {
try {
  const user = await userModel.findOne({_id:req.body.userId})
  const seennotification = user.seennotification
  const notification = user.notification
  seennotification.push(...notification)
  user.notification = []
  user.seennotification = notification
  const updatedUser = await user.save()
  res.status(200).send({
    success:true,
    message:"all notifications marked as read",
    data:updatedUser
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message:"error while getting all notification"
  })
}
  }

  const deleteAllNotificationController = async(req,res) =>{
    try {
      const user = await userModel.findOne({_id:req.body.userId})
      user.notification = []
      user.seennotification = []
      const updatedUser = await user.save()
      updatedUser.password = undefined
      res.status(201).send({
        success:true,
        message:"All Notifications Deleted Successfully",
        data:updatedUser
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"Failed to deleting all notifications",
        error
      })
    }
  }

  // get all doctors ctrl
  const getAllDoctorsController = async(req,res)=>{
    try {
      const doctors = await doctorModel.find({status:'approved'})
      res.status(200).send({
        success:true,
        message:"Doctors List fetched successfully",
        data:doctors,
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false ,
        message:'error while fetching the all doctors',
        error
      })
    }
  }

const bookAppointmentController = async(req,res)=>{
  try {
    req.body.status = "pending"
    const newAppointment = new appointmentModel(req.body)
    await newAppointment.save()
    // const user = await userModel.findOne({_id:req.body.userId})
    const user = await userModel.findOne({_id:req.body.userId})
    console.log("here is doctor id "+user)
    user.notification.push({
      type:"new-appointment-request",
      message:`A new appointment request from ${req.body.userInfo.name}`,
      onClickPath:'/user/appointments',
    })
    await user.save()
    res.status(200).send({
      success:true,
      message:"New Appointment Request Sent Successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"server error while booking an appointment",
      error
    })
  }
}




  module.exports = { loginController, registerController, authController ,applyDoctorController ,getAllNotificationController , deleteAllNotificationController , getAllDoctorsController, bookAppointmentController};