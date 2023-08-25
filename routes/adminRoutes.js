const express =require("express")
const authMiddleware = require('../middlewares/authMiddleware')
const { getUsersController, getDoctorsController, changeAccountStatusController } = require("../controllers/adminControllers")

// router Object
const router = express.Router()

// routers

router.get("/getAllUsers",authMiddleware,getUsersController)
router.get("/getAllDoctors",authMiddleware,getDoctorsController)
router.post("/changeAccountStatus" , authMiddleware , changeAccountStatusController)
module.exports = router