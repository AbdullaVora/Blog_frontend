import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        toast.loading("Logging in...");
        dispatch(login({ email, password })).then((response) => {
            // console.log("Login Response:", response);
            if (response.payload.status === 200) {
                toast.dismiss(); // Dismiss any previous toasts
                toast.success("Login successful!")
                setTimeout(() => {
                    navigate('/')
                }, 1000); // Optional delay for better UX
                localStorage.setItem('token', JSON.stringify(response.payload.data.token));
                setLoading(false);
            } else {
                toast.dismiss(); // Dismiss any previous toasts
                toast.error(response?.payload?.message || "Login failed. Please try again.");
                setLoading(false);
            }
        })
    };

    return (
        <>
            <div className="min-h-screen bg-[#0D1117] flex flex-col justify-center items-center px-4 pb-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">
                        Welcome to The Daily Blogs
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto">
                        Explore the latest articles, poems, and stories from our vibrant community.
                    </p>
                </div>

                {/* Login Box */}
                <form
                    onSubmit={handleLogin}
                    className="bg-[#161B22] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-white"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#00FFB3] text-center mb-6">
                        Sign In to Your Account
                    </h2>

                    <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 mb-4 rounded-md bg-[#0D1117] border border-[#00FFB3] focus:outline-none focus:ring-2 focus:ring-[#00FFB3]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-label="Email"
                    />

                    {/* <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full p-3 mb-6 rounded-md bg-[#0D1117] border border-[#00FFB3] focus:outline-none focus:ring-2 focus:ring-[#00FFB3]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-label="Password"
                    />
                     */}
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full p-3 pr-10 mb-6 rounded-md bg-[#0D1117] border border-[#00FFB3] focus:outline-none focus:ring-2 focus:ring-[#00FFB3]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-11 text-gray-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.104.179-2.161.508-3.153M4.222 4.222L19.778 19.778"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-[#00FFB3] text-black font-semibold p-3 rounded-md hover:bg-[#00e6a6] transition-colors duration-200"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
