// "use client";

// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock, FaEdit, FaTrash } from "react-icons/fa";
// import { BiShare } from "react-icons/bi";
// import { ToastContainer, toast } from 'react-toastify';

// const blogDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [blog, setblog] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);



//     const loadblog = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const data = await getstoriesById(id);
//             setblog(data);
//         } catch (err) {
//             console.error("Error loading blog:", err);
//             setError("Failed to load blog. Please try again later.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleShare = async () => {
//         try {
//             if (navigator.share) {
//                 await navigator.share({
//                     title: blog.title,
//                     text: blog.body?.substring(0, 100) + "...",
//                     url: window.location.href,
//                 });
//             } else {
//                 await navigator.clipboard.writeText(window.location.href);
//                 alert("Link copied to clipboard!");
//             }
//         } catch (err) {
//             console.error("Error sharing:", err);
//         }
//     };

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure you want to delete this blog?")) {
//             try {
//                 // await deleteblog(id);
//                 navigate("/");
//             } catch (err) {
//                 console.error("Error deleting blog:", err);
//             }
//         }
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return "Unknown date";
//         const date = new Date(dateString);
//         return date.toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         });
//     };

//     const estimateReadTime = (text) => {
//         if (!text) return "1 min read";
//         const wordsPerMinute = 200;
//         const words = text.split(/\s+/).length;
//         const minutes = Math.ceil(words / wordsPerMinute);
//         return `${minutes} min read`;
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-900 text-gray-100">
//                 <div className="flex justify-center items-center min-h-screen">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
//                 </div>
//             </div>
//         );
//     }

//     if (error || !blog) {
//         return (
//             <div className="min-h-screen bg-gray-900 text-gray-100">
//                 <div className="max-w-4xl mx-auto px-4 py-8">
//                     <div className="text-center">
//                         <div className="bg-red-900 border border-red-700 text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto mb-6">
//                             {error || "blog not found"}
//                         </div>
//                         <Link
//                             to="/"
//                             className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
//                         >
//                             <FaArrowLeft /> Go Back Home
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>{blog.title} | The Daily Blogs - Discover the Untold Stories</title>
//                 <meta name="description" content={blog.body?.substring(0, 160)} />
//             </Helmet>

//             <div className="min-h-screen bg-gray-900 text-gray-100">
//                 {/* Header with Back Button */}
//                 <header className="border-b border-gray-700 bg-gray-800">
//                     <div className="max-w-6xl mx-auto px-4 py-4">
//                         <div className="flex items-center justify-between">
//                             <Link
//                                 to="/"
//                                 className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
//                             >
//                                 <FaArrowLeft /> Back to Stories
//                             </Link>

//                             {/* Action Buttons */}
//                             <div className="flex items-center gap-3">
//                                 <button
//                                     onClick={handleShare}
//                                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
//                                     title="Share blog"
//                                 >
//                                     <BiShare size={18} />
//                                 </button>
//                                 <Link
//                                     to={`/editBlog/${blog.id}`}
//                                     className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 text-white transition-colors"
//                                     title="Edit blog"
//                                 >
//                                     <FaEdit size={16} />
//                                 </Link>
//                                 <button
//                                     onClick={handleDelete}
//                                     className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition-colors"
//                                     title="Delete blog"
//                                 >
//                                     <FaTrash size={16} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Featured Image - Full Width */}
//                 {blog.media && blog.media.fileType && (
//                     <div className="mb-4">
//                         {blog.media.fileType.match('image.*') ? (
//                             <img
//                                 src={blog.media.url}
//                                 alt="blog media"
//                                 className="w-full h-auto rounded-md"
//                             />
//                         ) : blog.media.fileType.match('video.*') ? (
//                             <video
//                                 muted
//                                 loop
//                                 src={blog.media.url}
//                                 autoPlay
//                                 className="w-full h-auto rounded-md"
//                             />
//                         ) : (
//                             <div className="text-gray-400 text-sm">
//                                 Unsupported media type: {stories.media.fileType}
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Main Content - No Card Container */}
//                 <main className="max-w-7xl mx-auto px-4 py-8">
//                     <article>
//                         {/* blog Meta */}
//                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
//                             <div className="flex items-center gap-2">
//                                 <FaUser className="text-emerald-400" />
//                                 <span>{blog.name || blog.author || "Anonymous"}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <FaCalendarAlt className="text-emerald-400" />
//                                 <span>{formatDate(blog.createdAt || blog.date)}</span>
//                             </div>
//                             {/* <div className="flex items-center gap-2">
//                 <FaClock className="text-emerald-400" />
//                 <span>{estimateReadTime(blog.body)}</span>
//               </div> */}
//                             {blog.email && (
//                                 <div className="text-gray-500">
//                                     <span>by {blog.email}</span>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Title */}
//                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-6 leading-tight">
//                             {blog.title}
//                         </h1>

//                         {/* Subtitle */}
//                         {blog.subtitle && (
//                             <p className="text-xl md:text-2xl text-gray-300 mb-12 font-medium leading-relaxed">
//                                 {blog.subtitle}
//                             </p>
//                         )}

//                         {/* blog Content */}
//                         <div className="prose prose-lg prose-invert prose-emerald max-w-none">
//                             <div className="text-gray-300 leading-relaxed space-y-6">
//                                 {blog.body ? (
//                                     blog.body.split('\n\n').map((paragraph, index) => (
//                                         <p key={index} className="text-lg md:text-xl leading-relaxed">
//                                             {paragraph.trim()}
//                                         </p>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-400 italic">No content available.</p>
//                                 )}
//                             </div>
//                         </div>

//                         {/* blog Footer */}
//                         <div className="mt-16 pt-8 border-t border-gray-700">
//                             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//                                 {/* Author Info */}
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-16 h-16 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-xl font-medium">
//                                         {(blog.name || blog.author || "A").charAt(0).toUpperCase()}
//                                     </div>
//                                     <div>
//                                         <p className="font-medium text-gray-200 text-lg">
//                                             {blog.name || blog.author || "Anonymous"}
//                                         </p>
//                                         {blog.email && (
//                                             <p className="text-gray-400">{blog.email}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Share Button */}
//                                 <button
//                                     onClick={handleShare}
//                                     className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors text-lg"
//                                 >
//                                     <BiShare /> Share blog
//                                 </button>
//                             </div>
//                         </div>
//                     </article>

//                     {/* Navigation */}
//                     <div className="mt-12 flex justify-center">
//                         <Link
//                             to="/"
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-emerald-600 text-gray-300 hover:text-emerald-400 font-medium rounded-lg transition-all duration-300"
//                         >
//                             <FaArrowLeft /> Back to All Stories
//                         </Link>
//                     </div>
//                 </main>
//             </div>

//             <ToastContainer />
//         </>
//     );
// };

// export default blogDetails;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock, FaEdit, FaTrash } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../redux/slices/blogSlice";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { blogs, loading } = useSelector((state) => state.blogs);
    const { user } = useSelector((state) => state.user);
    console.log(blogs)

    // Find the specific blog from Redux state
    const allBlogs = blogs || [];
    const blog = allBlogs.find(blog => blog._id === id);

    const [error, setError] = useState(null);

    useEffect(() => {
        // If blogs are not loaded or blog not found, fetch blogs
        if (!allBlogs.length || !blog) {
            dispatch(getBlogs());
        }
    }, [dispatch, allBlogs.length, blog]);

    useEffect(() => {
        // Set error if loading is complete but blog not found
        if (!loading && allBlogs.length > 0 && !blog) {
            setError("blog not found");
        } else if (blog) {
            setError(null);
        }
    }, [loading, allBlogs.length, blog]);

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: blog.title,
                    text: blog.description?.substring(0, 100) + "...",
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!", { position: "top-right" });
            }
        } catch (err) {
            console.error("Error sharing:", err);
            toast.error("Failed to share", { position: "top-right" });
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await dispatch(deleteBlog(id));
                toast.success("blog deleted successfully", { position: "top-right" });
                navigate("/");
            } catch (err) {
                console.error("Error deleting blog:", err);
                toast.error("Failed to delete blog", { position: "top-right" });
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="bg-red-900 border border-red-700 text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto mb-6">
                            {error || "blog not found"}
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
                        >
                            <FaArrowLeft /> Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Handle media URL - it's a string in your data but component expects an object
    const mediaUrl = typeof blog.media === 'string' ? blog.media : blog.media?.url;

    return (
        <>
            <Helmet>
                <title>{blog.title} | The Daily Blogs - Discover the Untold Stories</title>
                <meta name="description" content={blog.description?.substring(0, 160)} />
            </Helmet>

            <div className="min-h-screen bg-gray-900 text-gray-100">
                {/* Header with Back Button */}
                <header className="border-b border-gray-700 bg-gray-800">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                <FaArrowLeft /> Back to Stories
                            </Link>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                                    title="Share Blog"
                                >
                                    <BiShare size={18} />
                                </button>

                                {user?.role === "admin" && (
                                    <>
                                        <Link
                                            to={`/editblog/${blog._id}`}
                                            className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 text-white transition-colors"
                                            title="Edit Blog"
                                        >
                                            <FaEdit size={16} />
                                        </Link>

                                        <button
                                            onClick={handleDelete}
                                            className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition-colors"
                                            title="Delete blog"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image - Full Width */}
                {mediaUrl ? (
                    mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                            src={mediaUrl}
                            muted
                            autoPlay
                            loop
                            className="w-full h-full object-cover"
                        />
                    ) : mediaUrl.match(/\.(gif|jpg|jpeg|png|webp|svg)$/i) ? (
                        <img
                            src={mediaUrl}
                            alt="Blog media"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-sm">
                            Unsupported media format
                        </div>
                    )
                ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-sm">
                        No media available
                    </div>
                )}

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <article>
                        {/* blog Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                                <FaUser className="text-emerald-400" />
                                <span>{blog.author || "Anonymous"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-emerald-400" />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            {blog.category && (
                                <div className="text-emerald-400">
                                    <span className="px-2 py-1 bg-emerald-600/20 rounded-full text-xs uppercase">
                                        {blog.category}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Description/Subtitle */}
                        {blog.description && (
                            <p className="text-xl md:text-2xl text-gray-300 mb-12 font-medium leading-relaxed">
                                {blog.description}
                            </p>
                        )}

                        {/* blog Content */}
                        <div className="prose prose-lg prose-invert prose-emerald max-w-none">
                            <div className="text-gray-300 leading-relaxed space-y-6">
                                {blog.content ? (
                                    blog.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="text-lg md:text-xl leading-relaxed">
                                            {paragraph.trim()}
                                        </p>
                                    ))
                                ) : blog.description ? (
                                    <p className="text-lg md:text-xl leading-relaxed">
                                        {blog.description}
                                    </p>
                                ) : (
                                    <p className="text-gray-400 italic">No content available.</p>
                                )}
                            </div>
                        </div>

                        {/* blog Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-700">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-xl font-medium">
                                        {(blog.author || "A").charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-200 text-lg">
                                            {blog.author || "Anonymous"}
                                        </p>
                                        <p className="text-gray-400">
                                            Published {formatDate(blog.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Share Button */}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors text-lg"
                                >
                                    <BiShare /> Share blog
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Navigation */}
                    <div className="mt-12 flex justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-emerald-600 text-gray-300 hover:text-emerald-400 font-medium rounded-lg transition-all duration-300"
                        >
                            <FaArrowLeft /> Back to All Stories
                        </Link>
                    </div>
                </main>
            </div>

            <ToastContainer />
        </>
    );
};

export default BlogDetails;