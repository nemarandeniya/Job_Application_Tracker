import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import DashboardCard from '../Components/DashboardCard'
import { HiOutlineDocumentText } from "react-icons/hi"
import { MdOutlineSchedule } from "react-icons/md"
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineXCircle } from "react-icons/hi";
import AddApplication from '../Components/AddApplication'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ title, icon, value }) => {
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/')
        }
    }, [])

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div >
            <Navbar openModal={() => setIsOpen(true)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 ms-2 me-6">
                <DashboardCard title={'Total Applications'} icon={<HiOutlineDocumentText size={30} className='text-blue-400' />} value={20} />
                <DashboardCard title={'Pending'} icon={<MdOutlineSchedule size={30} className='text-yellow-400' />} value={20} />
                <DashboardCard title={'Interviews'} icon={<MdOutlinePendingActions size={30} className='text-green-400' />} value={20} />
                <DashboardCard title={'Rejected'} icon={<HiOutlineXCircle size={30} className='text-red-400' />} value={20} />
            </div>
            <div className="max-w-8xl p-7 ms-7 mt-10 me-6 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-50/80 border border-gray-200 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center">
                    <HiOutlineDocumentText size={40} />
                    <h2 className="text-md font-mono font-bold text-neutral-700">No Applications Yet</h2>
                    <p className="text-sm mt-2 font-mono text-neutral-400">Start tracking your applications by clicking the 'Add Application' button above</p>
                </div>
            </div>
            <AddApplication isOpen={isOpen} onClose={() => setIsOpen(false)} />

        </div>
    )
}

export default Dashboard
