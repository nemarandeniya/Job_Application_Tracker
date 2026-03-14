import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import DashboardCard from '../Components/DashboardCard'
import { HiOutlineDocumentText } from "react-icons/hi"
import { MdOutlineSchedule } from "react-icons/md"
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineXCircle } from "react-icons/hi";
import AddApplication from '../Components/AddApplication'
import { useNavigate } from 'react-router-dom'
import { useGetUser } from '../hooks/useGetUser.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import ApplicationCard from '../Components/ApplicationCard.jsx'
import UpdateApplication from '../Components/updateApplication.jsx'
import UpdateUser from '../Components/UpdateUser.jsx'

const Dashboard = () => {

    const navigate = useNavigate();
    const user = useGetUser()
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [pendingCount, setPendingCount] = useState(0)
    const [interviewCount, setInterviewCount] = useState(0)
    const [rejectCount, setRejectCount] = useState(0)
    const [applications, setApplications] = useState([])
    const [selectedApplication, setSelectedApplication] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const getAllApplications = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/application/${user.id}?page=${page}&limit=6`)
            setApplications(response.data.response)
            setTotalPages(response.data.totalPages)
            console.log(user);

        } catch (error) {
            console.error(error);
        }
    }

    const deleteApplication = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/application/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            toast.success("Application Succesfully deleted")
            // Remove from state immediately
            setApplications((prev) => prev.filter((app) => app._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed")
        }
    }

    const getCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/application/count/${user.id}`)
            if (response.data.success) {
                setCount(response.data.count)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getStatusCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/application/statuscount/${user.id}`)
            if (response.data.success) {
                setPendingCount(response.data.pending)
                setInterviewCount(response.data.interview)
                setRejectCount(response.data.rejected)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCount()

        getStatusCount()

        getAllApplications()

        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/')
        }
    }, [user?.id, navigate, page])



    return (
        <div >
            <Navbar openModal={() => setIsOpen(true)} onUserEdit={() => setIsUpdateUserOpen(true)} />

            <div className="grid grid-cols-1 mt-36 sm:grid-cols-2 lg:grid-cols-4  ms-2 me-6">
                <DashboardCard title={'Total Applications'} icon={<HiOutlineDocumentText size={30} className='text-blue-400' />} value={count} />
                <DashboardCard title={'Pending'} icon={<MdOutlineSchedule size={30} className='text-yellow-400' />} value={pendingCount} />
                <DashboardCard title={'Interviews'} icon={<MdOutlinePendingActions size={30} className='text-green-400' />} value={interviewCount} />
                <DashboardCard title={'Rejected'} icon={<HiOutlineXCircle size={30} className='text-red-400' />} value={rejectCount} />
            </div>
            {applications.length === 0 ? (
                <div className="max-w-8xl p-7 ms-7 mt-10 me-6 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-50/80 border border-gray-200 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center">
                        <HiOutlineDocumentText size={40} />
                        <h2 className="text-md font-mono font-bold text-neutral-700">No Applications Yet</h2>
                        <p className="text-sm mt-2 font-mono text-neutral-400">Start tracking your applications by clicking the 'Add Application' button above</p>
                    </div>
                </div>
            ) : (
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 mb-0.5">
                    {applications.map((application) => (
                        <ApplicationCard key={application._id} onDelete={deleteApplication} application={application} onEdit={() => {
                            console.log(application);
                            setSelectedApplication(application)
                            setIsUpdateOpen(true)
                        }} />
                    ))}
                    <UpdateApplication isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} application={selectedApplication} refreshApplication={getAllApplications} getStatusCount={getStatusCount} />
                    <UpdateUser isOpen={isUpdateUserOpen} onClose={() => setIsUpdateUserOpen(false)} user={user} />
                </div>
            )}
            <AddApplication isOpen={isOpen} onClose={() => setIsOpen(false)} application={selectedApplication} refreshApplication={getAllApplications} getCount={getCount} getStatusCount={getStatusCount} />

            {/* companyName={application.companyName} jobTitle={application.jobTitle} jobType={application.jobType} jobStatus={application.jobStatus} aplicationDate={application.aplicationDate} note={application.note} usedResume={application.usedResume} */}
            {/* Pagination */}
            <div className=' flex items-center justify-center mt-7'>
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className='bg-gray-950 cursor-pointer p-1 me-1 border border-gray-200 backdrop-blur-sm text-white' onClick={() => setPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}

                {/* Array(totalPages)-->Creates an empty array with totalPages length.
                    _ → current value (we don't need it)
                    i → index number (0,1,2,3...)
                    */}
            </div>
        </div>
    )
}

export default Dashboard
