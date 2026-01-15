import tutorModel from "../models/tutorModel.js";


const changeAvailability = async (req, res) => {
    try {
        const { tutorId} = req.body;
        const tutorData = await tutorModel.findById(tutorId);
        await tutorModel.findByIdAndUpdate(tutorId, {available: !tutorData.available});
        res.json({ success: true, message: "Tutor availability updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message});
    }
}

export { changeAvailability };