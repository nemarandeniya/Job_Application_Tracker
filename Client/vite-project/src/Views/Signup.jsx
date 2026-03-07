import { useState } from 'react'
import { useRef } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", })
    const [profilePhoto, setprofilePhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const fileRef = useRef()
    const navigate = useNavigate()

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


    const handleSignup = async (e) => {

        e.preventDefault()
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("firstName", form.firstName)
            formData.append("lastName", form.lastName)
            formData.append("email", form.email)
            formData.append("password", form.password)

            if (fileRef.current.files[0]) {
                formData.append("profilePhoto", fileRef.current.files[0])
            }

            const response = await axios.post("http://localhost:5000/auth/register", formData)
            if (response.data.success) {
                toast.success("Successfully Registered!")
                navigate('/login')
            }
            setLoading(false)
            setSubmitted(true)
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message || "Signup failed")
        }
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-black">

            {/* Left side */}
            <div className="w-7/12 flex flex-col justify-between bg-neutral-950 p-17 relative overflow-hidden">
                <div className="absolute inset-0 opacity-7"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }}//First gradient → horizontal lines   //Second gradient → vertical lines
                />
                {/* Brand */}
                <div className="relative z-10 text-xs tracking-widest uppercase text-yellow-600 font-mono">
                    ◆ Studio Access
                </div>

                <div className="relative z-10">
                    <p className="text-xs tracking-widest uppercase text-neutral-600 font-mono mb-6">Est. MMXXIV</p>
                    <h1 className="font-serif text-7xl font-black leading-none tracking-tight text-stone-100">
                        Every<br />
                        <span className="italic text-yellow-600">application</span><br />
                        one step
                        <br />
                        closer.
                    </h1>
                    <div className="mt-10">
                        <div className="w-14 h-px bg-yellow-600 mb-5" />
                        <p className="font-mono text-xs text-neutral-500 leading-loose">
                            No messy spreadsheets.<br />
                            Just a clean way to manage<br />
                            your job applications.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="w-5/12 flex flex-col justify-center px-16 py-20 relative justify-center bg-stone-100">
                <form className="w-full space-y-4" onSubmit={handleSignup}>
                    {/* top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-800"></div>

                    <p className=' font-mono text-xs tracking-widest uppercase text-neutral-400 mb-3'>Member access</p>
                    <h2 className="text-4xl font-serif font-bold text-neutral-900 leading-tight mb-2">
                        Create<br />Account
                    </h2>
                    <p className='font-mono text-xs text-neutral-400 mb-12'>Apply for access and start creating.</p>


                    {/* Profile image */}
                    <div className="mb-8">
                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>Profile Photo</label>
                        <div className="flex items-center gap-5">
                            {/* Avatar preview */}
                            <div onClick={() => fileRef.current.click()}
                                className="w-16 h-16 rounded-full border-2 border-dashed border-stone-300 hover:border-yellow-600 flex ir=tems-center justify-center cursor-pointer overflow-hidden transition-colors duration-300 flex-shrink-0">
                                {profilePhoto ? (
                                    <img src={profilePhoto} alt='profilePhoto' className='w-full h-full object-cover' />
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
                                    {profilePhoto ? "Change photo" : "Choose file"}
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
                            <div className="mb-2">
                                <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="*********"
                                className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full py-4 bg-neutral-900 hover:bg-yellow-600 text-stone-100 hover:text-neutral-900 foont-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60">
                        {loading ? "Authenticating" : submitted ? "Welcome back" : "Enter App"}
                    </button>

                    <div className="mt-4 flexitems center">
                        <span className='font-mono text-xs text-neutral-400'>
                            Have an account?:{" "}
                            <span className='text-yellow-700 border-b border-yellow-600 cursor-pointer hover:text-neutral-900 transition-colors'>
                                Sign in
                            </span>
                        </span>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Signup



















