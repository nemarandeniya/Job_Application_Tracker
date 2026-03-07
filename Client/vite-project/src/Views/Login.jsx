import { useState } from 'react'
import React from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)


    const handleLogin = () => {
        try {
            setLoading(true);

            setLoading(false)
            setSubmitted(true)
        } catch (error) {
            setLoading(false)
            console.log(error);
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
                <form className="w-80 space-y-4">
                    {/* top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-800"></div>

                    <p className=' font-mono text-xs tracking-widest uppercase text-neutral-400 mb-3'>Member access</p>
                    <h2 className="text-4xl font-serif font-bold text-neutral-900 leading-tight mb-2">
                        Welcome<br />back
                    </h2>
                    <p className='font-mono text-xs text-neutral-400 mb-12'>Sign in to continue your work.</p>

                    {/* email */}
                    <div className="mb-2">
                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                            Email Address
                        </label>
                    </div>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                    />

                    {/* password */}
                    <div className="mb-2 mt-4">
                        <label className='block font-mono text-xs tracking-widest uppercase text-neutral-400 mb-2'>
                            Password
                        </label>
                    </div>
                    <input
                        type="password"
                        placeholder="*********"
                        className="w-full bg-transparent border-b border-stone-300 focus:border-yellow-600 py-2 font-serif text-base text-neutral-900 placeholder-stone-300 outline-none transition-colors duration-300"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-4 bg-neutral-900 hover:bg-yellow-600 text-stone-100 hover:text-neutral-900 foont-mono text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-60">
                        {loading ? "Authenticating" : submitted ? "Welcome back" : "Enter App"}
                    </button>

                    <div className="mt-8 flexitems center">
                        <span className='font-mono text-xs text-neutral-400'>
                            New here:{" "}
                            <span className='text-yellow-700 border-b border-yellow-600 cursor-pointer hover:text-neutral-900 transition-colors'>
                                Apply for access
                            </span>
                        </span>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login



















// import React from 'react'

// const Login = () => {
//     return (
//         <div className="flex h-screen">

//             {/* Left side image */}
//             <div className="flex w-1/2">
//                 {/* <img
//                     src="/3639384.jpg"
//                     alt="login image"
//                     className="w-full h-full object-cover"
//                 /> */}
//                 <h2>bkxkkd</h2>
//             </div>

//             {/* Right side form */}
//             <div className="w-1/2 flex items-center justify-center bg-white">
//                 <form className="w-80 space-y-4">
//                     <h2 className="text-2xl font-bold">Login</h2>
//                     <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
//                     <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
//                     <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
//                 </form>
//             </div>

//         </div>
//     )
// }

// export default Login