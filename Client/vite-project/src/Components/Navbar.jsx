import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineLogout } from "react-icons/hi";
import AddApplication from './AddApplication';
import { useNavigate } from 'react-router-dom'
import { useGetUser } from '../hooks/useGetUser.js'

const Navbar = ({ openModal }) => {

    const navigate = useNavigate()
    const user = useGetUser()


    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }


    return (
        <>
            <motion.nav className='fixed top-0 w-full z-50 px-6 py-4 bg-gray-50/80 backdrop-blur-md border-b border-gray-50 shadow-xl'>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex  flex-col">
                        <h2 className="text-2xl font-serif font-bold text-neutral-900 leading-tight mb-0.5">
                            Job Application Tracker
                        </h2>
                        <p className='font-mono text-m text-neutral-400'>Welcome back.{user.firstName}!</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <button
                                onClick={() => openModal()}
                                className="py-4 px-2 bg-neutral-900 hover:bg-yellow-600 hover:border-0 text-stone-100 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 rounded-md">
                                Add Application
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-2 bg-gray-300 hover:bg-yellow-600 text-neutral-900 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 rounded-md">
                                <div className="flex">
                                    <HiOutlineLogout size={20} className='me-1 ms-1' />Log out
                                </div>
                            </button>
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