import React from 'react'
import { HiOutlineCalendar, HiOutlineBuildingOffice, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";


const ApplicationCard = ({ application, onDelete, key }) => {
    console.log("Application received:", application)
    return (
        <div className={'max-w-xl p-7 ms-7 mt-14 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-50/80 border border-gray-200 backdrop-blur-sm'}>
            <div className="flex items-center justify-between">
                <div className="flex text-md font-mono font-bold text-neutral-900">
                    {/* console.log(application); */}
                    <HiOutlineBuildingOffice size={20} className='me-2' /> {application.companyName}</div>

                <div className="flex">
                    <HiOutlinePencil size={20} className='me-2' />
                    <HiOutlineTrash size={20} onClick={() => onDelete(key)} />
                </div>
            </div>
            <div className="flex items-center">
                <div className='m-1 p-1 rounded-lg bg-emerald-400 text-sm font-sans'>{application.jobStatus}</div>
                <div className='m-1 p-1 rounded-lg bg-amber-300 text-sm font-sans'>{application.jobType}</div>
                <div className='m-1 p-1 flex justify-center items-center rounded-lg bg-gray-300 text-sm font-sans'><HiOutlineCalendar className='me-2' />{application.aplicationDate}</div>
            </div>

            <div className="text-md font-mono ms-1 mt-2">Note: </div>
            <div className="text-sm font-mono ms-1">{application.note} </div>
            <div className="text-md font-mono ms-1 mt-2">usedResume: </div>
            <div className="text-sm font-mono ms-1">{application.usedResume} </div>
        </div>
    )
}

export default ApplicationCard