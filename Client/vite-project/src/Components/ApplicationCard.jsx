import { useState } from 'react'
import { HiOutlineCalendar, HiOutlineBuildingOffice, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import UpdateApplication from './updateApplication';


const ApplicationCard = ({ application, onDelete, onEdit }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleUpdate = () => {
        setIsOpen(true)
        console.log("update");

    }
    // console.log("Application received:", application)
    return (
        <div className={'max-w-xl p-7 ms-7 mt-14 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-50/80 border border-gray-200 backdrop-blur-sm'}>
            <div className="flex items-center justify-between">
                <div className="flex text-md font-mono font-bold text-neutral-900">
                    {/* console.log(application); */}
                    <HiOutlineBuildingOffice size={20} className='me-2' /> {application.companyName}</div>

                <div className="flex">
                    <HiOutlinePencil size={20} className='me-3 transition-transform duration-200 hover:scale-125 cursor-pointer' onClick={onEdit} />
                    <HiOutlineTrash size={20} className=' transition-transform duration-200 hover:scale-125 cursor-pointer' onClick={() => onDelete(application._id)} />
                </div>
            </div>
            <div className="flex items-center">
                <div
                    className={`m-1 p-1 rounded-lg text-sm font-sans ${application.jobStatus === "applied"
                        ? "bg-amber-400"
                        : application.jobStatus === "interview"
                            ? "bg-emerald-400"
                            : "bg-red-400"
                        }`}
                >
                    {application.jobStatus}
                </div>
                <div className={`m-1 p-1 rounded-lg  text-sm font-sans ${application.jobType === "fulltime" ? "bg-sky-400" : "bg-fuchsia-400"}`}>{application.jobType}</div>
                <div className='m-1 p-1 flex justify-center items-center rounded-lg bg-gray-300 text-sm font-sans'><HiOutlineCalendar className='me-2' />{application.aplicationDate}</div>
            </div>

            <div className="text-md font-mono ms-1 mt-2">Note: </div>
            <div className="text-sm font-mono ms-1">{application.note} </div>
            <div className="text-md font-mono ms-1 mt-2">usedResume: </div>
            <div className="text-sm font-mono ms-1">{application.usedResume} </div>
        </div >


    )
}

export default ApplicationCard