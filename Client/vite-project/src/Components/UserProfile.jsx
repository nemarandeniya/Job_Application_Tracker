import React from 'react'
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'


const UserProfile = ({ user, edit }) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <div className='absolute right-0 mt-17 w-96 bg-white shadow-2xl rounded-lg border border-amber-50 z-50'>
            <div className="p-3 flex items-center justify-center font-semibold border-b-2 border-gray-400">
                User Profile
            </div>
            <div className="flex items-center justify-center mt-4">
                <div className="flex w-4/12 items-center justify-center me-5 w-16 h-16 rounded-full border-2  border-stone-300  flex items-center justify-center overflow-hidden transition-colors duration-300 flex-shrink-0 ">
                    <img src={`http://localhost:5000${user.profilePhoto}`} alt='profilePhoto' className='w-full h-full object-cover' />
                </div>
                <div className="w-8/12">
                    <div className="font-mono text-md ms-2  text-gray-500">
                        {user.firstName}{" "}{user.lastName}
                    </div>
                    <div className="font-mono text-md ms-2  text-gray-500">
                        {user.email}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button
                    onClick={edit}
                    className="py-4 px-2 w-1/2 bg-neutral-900 hover:bg-yellow-600 hover:border-0 text-stone-100 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 rounded-md">
                    <div className="flex">
                        <HiOutlineLogout size={20} className='me-1 ms-1' />Edit User Detail
                    </div>
                </button>
                <button
                    onClick={handleLogout}
                    className="px-2 py-4 w-1/2 bg-gray-300 hover:bg-yellow-600 text-neutral-900 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 rounded-md">
                    <div className="flex">
                        <HiOutlineLogout size={20} className='me-1 ms-1' />Log out
                    </div>
                </button>
            </div>
        </div>
    )
}

export default UserProfile