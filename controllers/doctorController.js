const doctorModel = require("../models/doctorModel")

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({doctorId:req.body.doctorId});
    console.log("Searching for doctor with ID:", doctor._id);
    
    if (!doctor) {
      console.log("Doc not found");
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }
    
    console.log("Doctor found:", doctor);
    
    res.status(200).send({
      success: true,
      message: "Doctor's detail fetched successfully.",
      data: doctor,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in fetching doctor details",
      error,
    });
  }
};

const updateDoctorProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true } // Ensure that the updated document is returned
    )
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      })
    }
    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error while updating doctor detail",
      error,
    })
  }
}

const getDoctorByIdController = async(req,res)=>{
  try {
    const doctor = await doctorModel.findOne({_id:req.body.doctorId})
    if(!doctor){
      res.status(404).send({
        success:false,
        message:"error while fetching single doctor record."
      })
    }
    res.status(200).send({
      success:true,
      message:'single doctor fetched.',
      data:doctor,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
    success:false,
    message:"Server error while fetching single Doctor data" ,
    error
    })
  }
}

module.exports = { getDoctorInfoController, updateDoctorProfileController ,getDoctorByIdController}
