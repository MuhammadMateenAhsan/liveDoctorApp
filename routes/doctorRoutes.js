const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController, updateDoctorProfileController,  getDoctorByIdController} = require("../controllers/doctorController");

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);
router.post("/updateDoctorProfile", authMiddleware, updateDoctorProfileController)
router.post("/getDoctorById", authMiddleware , getDoctorByIdController)
module.exports = router;


