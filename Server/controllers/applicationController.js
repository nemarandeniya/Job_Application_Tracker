import ApplicationModal from "../models/Application.js";


const getApplication = async (req, res) => {
    try {
        const response = await ApplicationModal.find({})
        return res.status(200).json({ success: true, message: "Application added successfully", response })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const addAplication = async (req, res) => {
    const application = new ApplicationModal(req.body)
    try {
        const response = await application.save()
        return res.status(200).json({ success: true, message: "Application added successfully", response })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export { getApplication, addAplication }