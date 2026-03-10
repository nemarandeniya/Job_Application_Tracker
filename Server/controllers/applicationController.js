import ApplicationModal from "../models/Application.js";
// import multer from "multer";
// import path from 'path'


// const storage = multer.diskStorage({//diskStorage tells multer where and how to store uploaded files.
//     destination: (req, file, cb) => {
//         cb(null, "public/resumes")//this is where image stores
//     },

//     //rename resume file(timestamp + file extension)
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

//create upload middleware
// const upload = multer({ storage: storage })

const getApplication = async (req, res) => {
    const userID = req.params.userID
    try {
        const response = await ApplicationModal.find({ userId: userID })

        return res.status(200).json({ success: true, message: "Application added successfully", response })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const addAplication = async (req, res) => {
    try {
        const application = new ApplicationModal({
            userId: req.body.userId,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobType: req.body.jobType,
            jobStatus: req.body.jobStatus,
            aplicationDate: req.body.aplicationDate,
            note: req.body.note,
            usedResume: req.body.usedResume,
        })
        const response = await application.save()
        return res.status(200).json({ success: true, message: "Application added successfully", response })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const updateApplication = async (req, res) => {
    try {
        const applicationId = req.params.id
        const updateData = req.body
        const updateApplication = await ApplicationModal.findByIdAndUpdate(applicationId, updateData,
            { new: true })
        return res.status(200).json({ success: true, message: "Application Updated successfully", updateApplication })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteApplication = await ApplicationModal.findByIdAndDelete(id)

        if (!deleteApplication) {
            return res.status(404).json({ success: false, message: "Application not found" })
        }
        return res.status(200).json({ success: true, message: "Application deleted successfully", deleteApplication })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const countApplication = async (req, res) => {
    const userID = req.params.userID
    try {
        const count = await ApplicationModal.countDocuments({ userId: userID })

        return res.status(200).json({ success: true, count })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const countApplicationBasedOnStatus = async (req, res) => {
    const userID = req.params.userID
    try {

        const pending = await ApplicationModal.countDocuments({ userId: userID, jobStatus: "applied" })
        const interview = await ApplicationModal.countDocuments({ userId: userID, jobStatus: "interview" })
        const rejected = await ApplicationModal.countDocuments({ userId: userID, jobStatus: "rejected" })

        return res.status(200).json({ success: true, pending, interview, rejected })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export { getApplication, addAplication, countApplication, countApplicationBasedOnStatus, updateApplication, deleteApplication }