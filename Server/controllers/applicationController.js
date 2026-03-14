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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6

        const skip = (page - 1) * limit
        const response = await ApplicationModal.find({ userId: userID }).skip(skip).limit(limit)
        const total = await ApplicationModal.countDocuments({ userId: userID })

        return res.status(200).json({ success: true, message: "Application get successfully", response, totalPages: Math.ceil(total / limit), currentPage: page })
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
            interviewDate: req.body.interviewDate,
            interviewTime: req.body.interviewTime,
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

const interviewNotification = async (req, res) => {
    try {
        const today = new Date();
        const tommorow = new Date()

        tommorow.setDate(today.getDate() + 1)

        const interviews = await ApplicationModal.find({ jobStatus: "interview" })

        const notifications = interviews.filter((application) => {
            if (!application.interviewDate) return false // skip missing dates
            const interviewDate = new Date(application.interviewDate)
            return (
                interviewDate.getFullYear() === tommorow.getFullYear() &&
                interviewDate.getMonth() === tommorow.getMonth() &&
                interviewDate.getDate() === tommorow.getDate()
            )
        })
        console.log(interviews);
        console.log(notifications);

        // res.json(interviews)
        res.json(notifications)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }
}

export { getApplication, addAplication, countApplication, countApplicationBasedOnStatus, updateApplication, deleteApplication, interviewNotification }