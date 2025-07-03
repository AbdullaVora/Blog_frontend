import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        media: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, media: reader.result });
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleChange = (e) => {
        console.log("Input Change:", e.target.name, e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(register(formData)).then((response) => {
            console.log("Register Response:", response.payload);
            if (response.payload.status === 201) {
                setTimeout(() => {
                    toast.success("Registration successful! Please login to continue.");
                    navigate('/login')
                }, 1000);
                setLoading(false);
            } else {
                toast.error(response?.payload?.error || "Registration failed. Please try again.");
                setLoading(false);
            }
        })
    };

    return (
        <>
            {/* Title/Header Section */}
            <div className="text-center py-12 bg-[#0D1117]">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">
                    Join The Daily Blogs
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto">
                    Share your thoughts, poems, and stories with the world.
                </p>
            </div>

            {/* Register Form Section */}
            <div className="min-h-screen bg-[#0D1117] flex items-start justify-center pt-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#161B22] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-white"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#00FFB3] text-center mb-6">
                        Create Your Account
                    </h2>

                    <input
                        name="name"
                        placeholder="Full Name"
                        className="w-full p-3 mb-4 rounded bg-[#0D1117] border border-[#00FFB3] text-white"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 rounded bg-[#0D1117] border border-[#00FFB3] text-white"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {/* <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 rounded bg-[#0D1117] border border-[#00FFB3] text-white"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    /> */}
                    <div className="relative">
                        <input
                            id="password"
                            name='password'
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full p-3 pr-10 mb-6 rounded-md bg-[#0D1117] border border-[#00FFB3] focus:outline-none focus:ring-2 focus:ring-[#00FFB3]"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            aria-label="Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-4 text-gray-400 hover:text-white"
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
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 mb-4 rounded bg-[#0D1117] text-white"
                        onChange={handleImageChange}
                    />

                    {formData.media && (
                        <img
                            src={formData.media}
                            alt="Preview"
                            className="h-20 w-20 object-cover rounded-full mb-4 mx-auto border border-[#00FFB3]"
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#00FFB3] text-black font-semibold p-3 rounded hover:bg-[#00e6a6] transition-colors duration-200"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
