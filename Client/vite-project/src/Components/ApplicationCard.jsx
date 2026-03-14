import { useState } from 'react'
import { HiOutlineCalendar, HiOutlineBuildingOffice, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import UpdateApplication from './updateApplication';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip';


const ApplicationCard = ({ application, onDelete, onEdit }) => {

    const [isOpen, setIsOpen] = useState(false)

    const statusTooltipId = `status-${application._id}`;
    const typeTooltipId = `type-${application._id}`;
    const dateTooltipId = `date-${application._id}`;
    const editTooltipId = `edit-${application._id}`;
    const deleteTooltipId = `delete-${application._id}`;
    // const handleUpdate = () => {
    //     setIsOpen(true)
    //     console.log("update");

    // }
    // console.log("Application received:", application)
    return (
        <div className={'max-w-xl p-7 ms-7 mt-14 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-50/80 border border-gray-200 backdrop-blur-sm'}>
            <div className="flex items-center justify-between">
                <div className="flex text-md font-mono font-bold text-neutral-900">
                    {/* console.log(application); */}
                    <HiOutlineBuildingOffice size={20} className='me-2' /> {application.companyName}</div>

                <div className="flex">
                    <HiOutlinePencil data-tooltip-id={editTooltipId} size={20} className='me-3 transition-transform duration-200 hover:scale-125 cursor-pointer' onClick={onEdit} />
                    <HiOutlineTrash data-tooltip-id={deleteTooltipId} size={20} className=' transition-transform duration-200 hover:scale-125 cursor-pointer' onClick={() => onDelete(application._id)} />
                </div>
            </div>
            <div className="flex items-center">
                <div data-tooltip-id={statusTooltipId}
                    className={`m-1 p-1 rounded-lg text-sm font-sans ${application.jobStatus === "applied"
                        ? "bg-amber-400"
                        : application.jobStatus === "interview"
                            ? "bg-emerald-400"
                            : "bg-red-400"
                        }`}
                >
                    {application.jobStatus}
                </div>
                <div data-tooltip-id={typeTooltipId} className={`m-1 p-1 rounded-lg  text-sm font-sans ${application.jobType === "fulltime" ? "bg-sky-400" : "bg-fuchsia-400"}`}>{application.jobType}</div>
                <div data-tooltip-id={dateTooltipId} className='m-1 p-1 flex justify-center items-center rounded-lg bg-gray-300 text-sm font-sans'><HiOutlineCalendar className='me-2' />{application.aplicationDate}</div>
            </div>

            {application.jobStatus === "interview" && (
                <div className=' flex'>
                    <div className="text-md font-mono mt-2">Interview Date: </div>
                    <div className='m-1 p-1 flex justify-center items-center rounded-lg bg-red-400 text-sm font-sans'><HiOutlineCalendar className='me-2' />{application.interviewDate}</div>
                </div>
            )}
            <div className="text-md font-mono ms-1 mt-2">Note: </div>
            <div className="text-sm font-mono ms-1">{application.note} </div>
            <div className="text-md font-mono ms-1 mt-2">usedResume: </div>
            <div className="text-sm font-mono ms-1">{application.usedResume} </div>

            <Tooltip id={statusTooltipId} place='top' effect="solid" style={{ borderRadius: '0.5rem', backgroundColor: '#1f2937', color: 'white' }}>
                Job Status
            </Tooltip>
            <Tooltip id={typeTooltipId} place='top' effect="solid" style={{ borderRadius: '0.5rem', backgroundColor: '#1f2937', color: 'white' }}>
                Job Type
            </Tooltip>
            <Tooltip id={dateTooltipId} place='top' effect="solid" style={{ borderRadius: '0.5rem', backgroundColor: '#1f2937', color: 'white' }}>
                Job Application Date
            </Tooltip>
            <Tooltip id={editTooltipId} place='top' effect="solid" style={{ borderRadius: '0.5rem', backgroundColor: '#1f2937', color: 'white' }}>
                Update
            </Tooltip>
            <Tooltip id={deleteTooltipId} place='top' effect="solid" style={{ borderRadius: '0.5rem', backgroundColor: '#1f2937', color: 'white' }}>
                Delete
            </Tooltip>
        </div >


    )
}

export default ApplicationCard