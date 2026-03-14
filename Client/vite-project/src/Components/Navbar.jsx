import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import AddApplication from './AddApplication';
import { useNavigate } from 'react-router-dom'
import { useGetUser } from '../hooks/useGetUser.js'
import { HiOutlineBell, HiBell } from "react-icons/hi2";
import NotificationModal from './NotificationModal.jsx';
import UserProfile from './UserProfile.jsx';

const Navbar = ({ openModal, onUserEdit }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
    const user = useGetUser()
    const [notifications, setNotifications] = useState([])


    const getInterviewApplications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/application/interviewnotification')
            setNotifications(response.data)
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getInterviewApplications()
    }, [])

    // const handleLogout = () => {
    //     localStorage.removeItem("token")
    //     navigate("/")
    // }


    return (
        <>
            <motion.nav className='fixed top-0 w-full z-50 px-6 py-4 bg-gray-50/80 backdrop-blur-md border-b border-gray-50 shadow-xl'>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex  flex-col">
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 leading-tight mb-0.5">
                            Job Application Tracker
                        </h2>
                        <p className='font-mono text-m text-neutral-400'>Welcome back.!</p>
                    </div>
                    <div className="">
                        {/* {hasNotifications ? (
                            <HiBell size={28} className="text-red-500 cursor-pointer" />
                            ) : (
                                <HiOutlineBell size={28} className="text-gray-600 cursor-pointer" />
                                )} */}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <div className="relative inline-block">
                                <HiBell onClick={() => setIsOpen(!isOpen)} size={28} className="cursor-pointer mt-2 me-4 hover:text-yellow-600" />

                                {/* Notification Badge */}
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                        {notifications.length}
                                    </span>
                                )}

                                {isOpen && (
                                    <NotificationModal notifications={notifications} />
                                )}
                            </div>

                            <button
                                onClick={() => openModal()}
                                className="py-4 px-2 bg-neutral-900 hover:bg-yellow-600 hover:border-0 text-stone-100 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 rounded-md">
                                Add Application
                            </button>
                            {/* <button
                                onClick={handleLogout}
                                className="px-2 bg-gray-300 hover:bg-yellow-600 text-neutral-900 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 rounded-md">
                                <div className="flex">
                                    <HiOutlineLogout size={20} className='me-1 ms-1' />Log out
                                </div>
                            </button> */}
                            <div onClick={() => setIsUserProfileOpen(!isUserProfileOpen)} className="ms-2 w-11 h-11  relative inline-block rounded-full border-2  border-stone-300  cursor-pointer flex items-center justify-center overflow-hidden transition-colors duration-300 flex-shrink-0">
                                <img src={`http://localhost:5000${user.profilePhoto}`} alt='profilePhoto' className='w-full h-full object-cover' />
                            </div>
                            {isUserProfileOpen && (
                                <UserProfile user={user} edit={onUserEdit} />
                            )}
                        </div>
                    </div>
                </div>

            </motion.nav>
            {/* Modal
            <AddApplication isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}

        </>
    )
}

export default Navbar