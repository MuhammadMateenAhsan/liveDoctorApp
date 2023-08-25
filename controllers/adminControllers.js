const userModel = require("../models/userModels")
const doctorModel = require("../models/doctorModel")

const getUsersController = async(req,res)=>{
    try {
    const users = await userModel.find({});
    res.status(200).send({
        success:true,
        message:"Users data list",
        data:users,
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while fetching users list",
            error
        })
    }
}

const getDoctorsController = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success:true,
            message:"Doctors data list",
            data:doctors,
        })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:"error while fetching doctors list",
                error
            })
        }
}

// const changeAccountStatusController = async(req,res)=>{
// try {
//     const {doctorId , status} = req.body;
//     const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
//     const user = await userModel.findOne({_id:doctor.userId})
//     const notification = user.notification
//     notification.push({
//         type : 'doctor-account-request-updated',
//         // title :"Doctor Account Status Changed ",
//         // body:`Your Doctor's Account is ${status}`
//         message:`Your Doctor's Account is ${status}`,
//         onClickPath:"/notification"
//     });
//     user.isDoctor = status === "approved" ? true:false;
//     await user.save();
//     res.status(201).send({
//         success:true,
//         message:'account status changed successfully',
//         data:doctor,
//     })
// } catch (error) {
//     console.log(error)
//     res.status(500).send({
//         success:false,
//         message:'Error in changing account status',
//         error
//     })
// }
// }

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId } = req.body;

        // Find and update the doctor request status
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status: 'approved' }, { new: true });

        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: 'Doctor request not found',
            });
        }

        // Find the user who applied for the doctor status and update
        const user = await userModel.findOneAndUpdate(
            { email: doctor.email, isDoctor: false },
            { $set: { isDoctor: true } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found or is already a doctor',
            });
        }

        // Update user's notifications
        const notification = {
            type: 'doctor-account-request-updated',
            message: "Your Doctor's Account is approved",
            onClickPath: '/notification',
        };
        user.notification.push(notification);

        await user.save();

        res.status(201).send({
            success: true,
            message: 'Account status changed successfully',
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in changing account status',
            error,
        });
    }
};



module.exports={getDoctorsController,getUsersController , changeAccountStatusController}