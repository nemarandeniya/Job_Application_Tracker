import { useState } from 'react'
import { useRef } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'


const UpdateUser = ({ isOpen, onClose, user }) => {

    const [form, setForm] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "", // only for password updates
    });
    const [profilePhoto, setprofilePhoto] = useState(user.profilePhoto || "")


    const fileRef = useRef()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleimage = (e) => {
        const file = e.target.files[0]//  Get the selected file
        if (!file) { //  Stop if no file selected
            return;
        }

        // Check file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Profile photo must be less than 2MB");
            return;
        }

        // Preview image
        setprofilePhoto(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("firstName", form.firstName)
            formData.append("lastName", form.lastName)
            formData.append("email", form.email)
            formData.append("password", form.password)

            if (fileRef.current.files[0]) {
                formData.append("profilePhoto", fileRef.current.files[0])
            }
            const response = await axios.put(`http://localhost:5000/auth/${user.id}`, formData)//...application-->JavaScript spreads all properties of application into the new object
            console.log(response);
            onClose()
            toast.success("User Update Successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "User Add failed")
            console.log(error);
        }
    }

    return (
        <>
            {isOpen && (

                <div className="fixed w-full mb-14 p-10 inset-0 z-50 flex items-center justify-center ">
                    <div className="bg-white border-gray-200 rounded-xl max-w-2xl w-full p-6 relative">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-mono font-bold mt-4 mb-6">Update User Details</h2>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-yellow-600 "
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* Profile image */}
                            <div className="mb-8">
                                <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>Profile Photo</label>
                                <div className="flex items-center gap-5">
                                    {/* Avatar preview */}
                                    <div onClick={() => fileRef.current.click()}
                                        className="w-16 h-16 rounded-full border-2 border-dashed border-stone-300 hover:border-yellow-600 flex items-center justify-center cursor-pointer overflow-hidden transition-colors duration-300 flex-shrink-0">
                                        {profilePhoto ? (
                                            <img src={profilePhoto.startsWith("blob")
                                                ? profilePhoto
                                                : `http://localhost:5000${profilePhoto}`}
                                                alt="profilePhoto"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className='text-stone-400 text-xl m-4'>+</span>
                                        )}
                                    </div>
                                    {/* upload text */}
                                    <div>
                                        <p className='font-mono text-xs text-neutral-500 mb-2 leading-relaxed'>
                                            Upload a profile photo.<br />JPG,PNG or WEBP. Max 2MB.
                                        </p>
                                        <button onClick={() => fileRef.current.click()}
                                            className='font-mono text-xs tracking-widest uppercase text-yellow-700 border-b border-yellow-600 hover:text-neutral-900 transition-colors duration-200'>
                                            {user.profilePhoto ? "Change photo" : "Choose file"}
                                        </button>

                                        {/* gidden file input */}
                                        <input ref={fileRef} type='file' accept='image/*' onChange={handleimage} className='hidden' />
                                    </div>
                                </div>
                            </div>

                            {/* name row */}
                            <div className="flex gap-6 mb-8">
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name='firstName'
                                        value={form.firstName}
                                        placeholder="Martin"
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name='lastName'
                                        value={form.lastName}
                                        placeholder="George"
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-6 mb-8">
                                <div className="flex-1">
                                    {/* email */}
                                    <div className="mb-2">
                                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                            Email Address
                                        </label>
                                    </div>
                                    <input
                                        type="email"
                                        value={form.email}
                                        name='email'
                                        placeholder="you@example.com"
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    {/* password */}
                                    {/* <div className="mb-2">
                                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        // value={form.password}
                                        // onChange={handleChange}
                                        placeholder="*********"
                                        className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                                    /> */}
                                </div>
                            </div>
                            <div className="flex w-full gap-2">
                                <div className="flex w-8/12 mb-4">
                                    <button
                                        className="w-full rounded-lg py-4 bg-neutral-900 hover:bg-yellow-600 text-stone-100 hover:text-neutral-900 font-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60">
                                        Update Application
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            )}</>
    )
}

export default UpdateUser