const express = require('express')
const { loginController, registerController, authController ,applyDoctorController ,getAllNotificationController , deleteAllNotificationController, getAllDoctorsController , bookAppointmentController} = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

// router object
const router = express.Router()

// routes
// LOGIN || POST
router.post('/login', loginController)

// REGISTER || POST
router.post('/register', registerController)
// for auth || POST
router.post('/getUserData' , authMiddleware , authController) 
module.exports = router

// for apply-doctor || POST
router.post('/apply-doctor' , authMiddleware , applyDoctorController) 
module.exports = router

// for getAllNotification
router.post('/get-all-notification' , authMiddleware , getAllNotificationController) 
module.exports = router

// for deleteAllNotification
router.post('/delete-all-notification' , authMiddleware , deleteAllNotificationController) 

// GET All Doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

// book an appointment
router.post('/book-Appointment' , authMiddleware, bookAppointmentController)
module.exports = router