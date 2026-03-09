import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    companyName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    jobStatus: {
        type: String,
        required: true,
    },
    aplicationDate: {
        type: String,
        required: true,
    },
    usedResume: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    }
})

const ApplicationModal = mongoose.model('applications', ApplicationSchema)
export default ApplicationModal