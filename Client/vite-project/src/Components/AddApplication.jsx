import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useGetUserId } from '../hooks/useGetUser.js'
import { useGetUser } from '../hooks/useGetUser.js'


const AddApplication = ({ isOpen, onClose, refreshApplication, getStatusCount, getCount }) => {

    const initialApplication = {
        companyName: "",
        jobTitle: "",
        jobType: "",
        jobStatus: "",
        aplicationDate: "",
        interviewDate: "",
        interviewTime: "",
        usedResume: "",
        note: "",
    }

    const [application, setApplication] = useState(initialApplication)
    const user = useGetUser()

    const handleChange = async (e) => {
        const { name, value } = e.target

        setApplication({ ...application, [name]: value })
        // const { name, value, files } = e.target;

        // if (name === "usedResume") {
        //     setApplication({ ...application, usedResume: files[0] })
        // } else {
        //     setApplication({ ...application, [name]: value })
        // }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log("user:", user);

            // const formData = new FormData();

            // formData.append("userId", user.id)
            // formData.append("companyName", application.companyName)
            // formData.append("jobTitle", application.jobTitle)
            // formData.append("jobType", application.jobType)
            // formData.append("jobStatus", application.jobStatus)
            // formData.append("aplicationDate", application.aplicationDate)
            // formData.append("note", application.note)
            // formData.append("usedResume", application.usedResume)

            await axios.post("http://localhost:5000/application", { userId: user.id, ...application })//...application-->JavaScript spreads all properties of application into the new object
            setApplication(initialApplication)
            onClose(true)
            refreshApplication()
            getStatusCount()
            getCount()
            toast.success("Application Added Successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Application Add failed")
            console.log(error);
            console.log("user:", user);

        }
    }

    return (
        <>
            {isOpen && (

                <div className="fixed w-full mb-14 p-10 inset-0 z-50 flex items-center justify-center ">
                    <div className="bg-white border-gray-200 rounded-xl max-w-2xl w-full p-6 relative">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-mono font-bold mt-4 mb-6">Add New Application</h2>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-yellow-600 "
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-6 mb-8">
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name='companyName'
                                        value={application.companyName}
                                        // placeholder="Martin"
                                        onChange={handleChange}
                                        className="w-full  bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name='jobTitle'
                                        value={application.jobTitle}
                                        onChange={handleChange}
                                        className="w-full  bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-6 mb-8">
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Job Type
                                    </label>
                                    <select
                                        name="jobType"
                                        value={application.jobType}
                                        onChange={handleChange}
                                        className="w-full  bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 outline-none transition-colors duration-300 appearance-none cursor-pointer"
                                    >
                                        <option value="" className="text-stone-300">Click to Select a Type</option>
                                        <option value="internship">Internship</option>
                                        <option value="fulltime">FullTime</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Status
                                    </label>
                                    <select
                                        name="jobStatus"
                                        value={application.jobStatus}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 outline-none transition-colors duration-300 appearance-none cursor-pointer"
                                    >
                                        <option value="" className="text-stone-300"> Click to Select a Status</option>
                                        <option value="applied">Applied</option>
                                        <option value="interview">Interview</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-6 mb-8">
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Application Date
                                    </label>
                                    <input
                                        type="date"
                                        name='aplicationDate'
                                        value={application.aplicationDate}
                                        onChange={handleChange}
                                        className="w-full  bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Resume used
                                    </label>
                                    <input
                                        type="text"
                                        name='usedResume'
                                        value={application.usedResume}
                                        // accept=".pdf,.doc,.docx"
                                        onChange={handleChange}
                                        className="w-full bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            {application.jobStatus === "interview" && (
                                <div className="flex gap-6 mb-8">
                                    <div className="flex-1">
                                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                            Interview Date
                                        </label>
                                        <input
                                            type="date"
                                            name='interviewDate'
                                            value={application.interviewDate}
                                            onChange={handleChange}
                                            className="w-full  bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                            Interview Time
                                        </label>
                                        <input
                                            type="time"
                                            name='interviewTime'
                                            value={application.interviewTime}
                                            onChange={handleChange}
                                            className="w-full  bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 mb-4">
                                <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                    Notes
                                </label>
                                <textarea
                                    name='note'
                                    value={application.note}
                                    placeholder="Any additional note about this application...."
                                    onChange={handleChange}
                                    className="w-full bg-white border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                ></textarea>
                            </div>
                            <div className="flex w-full gap-2">
                                <div className="flex w-8/12 mb-4">
                                    <button
                                        className="w-full rounded-lg py-4 bg-neutral-900 hover:bg-yellow-600 text-stone-100 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60">
                                        Add Application
                                    </button>
                                </div>
                                <div className="flex w-4/12 mb-4">
                                    <button
                                        type='button'
                                        onClick={() => { setApplication(initialApplication) }}
                                        className="w-full py-4 rounded-lg bg-gray-300 hover:bg-yellow-600 text-neutral-900 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60">
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}</>
    )
}

export default AddApplication