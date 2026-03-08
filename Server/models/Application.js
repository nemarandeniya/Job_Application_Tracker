import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        require: true,
    },
    jobTitle: {
        type: String,
        require: true,
    },
    jobType: {
        type: String,
        require: true,
    },
    jobStatus: {
        type: String,
        require: true,
    },
    aplicationDate: {
        type: String,
        require: true,
    },
    usedResume: {
        type: String,
        require: true,
    },
    note: {
        type: String,
    }
})

const ApplicationModal = mongoose.model('applications', ApplicationSchema)
export default ApplicationModal