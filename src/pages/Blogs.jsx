import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import BlogsCard from "../components/BlogsCard";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../redux/slices/blogSlice";

const Blogs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Items per page

    const dispatch = useDispatch();

    const { blogs, loading: BlogLoad } = useSelector((state) => state.blogs);

    console.log("Blogs:", blogs);
    // Directly compute values from Redux state
    const allBlogs = blogs || [];
    const loading = BlogLoad;
    const error = !BlogLoad && allBlogs.length === 0 ? "No Blogs found" : null;

    // Use useMemo for filtered blogs to optimize performance
    const filteredBlogs = useMemo(() => {
        return allBlogs.filter(blog =>
            blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allBlogs, searchQuery]);

    // Use useMemo for paginated blogs
    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredBlogs.slice(startIndex, endIndex);
    }, [filteredBlogs, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const deleteStory = async (id) => {
        try {
            await dispatch(deleteBlog(id));
            toast.success("Story deleted", { position: "top-right" });
        } catch (err) {
            console.error("Error deleting story:", err);
            toast.error("Failed to delete story", { position: "top-right" });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <Helmet>
                <title>The Daily Blogs – Discover the Untold Blogs</title>
                <meta name="description" content="A The Daily Blogs platform showcasing New York's hidden street-art, urban legends, and community Blogs—through photos, videos, poems, sketches, and interactive features." />
            </Helmet>

            <div className="min-h-screen bg-gray-900 text-gray-100">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Search Blogs..."
                                className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-300"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center mt-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="mt-12 text-center">
                            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Blogs Grid */}
                    {!loading && !error && (
                        <>
                            <div className="mt-12 flex flex-wrap gap-6">
                                {paginatedBlogs.length > 0 ? (
                                    paginatedBlogs.map((blog) => (
                                        <div className="w-full sm:w-[45%] lg:w-[32%]">
                                            <BlogsCard
                                                key={blog._id}
                                                blog={blog}
                                                onDelete={deleteStory}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-gray-400 text-lg">
                                            {searchQuery ? "No matching Blogs found." : "No Blogs found."}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12 space-x-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                    >
                                        Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-emerald-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            {/* Total Count */}
                            <div className="text-center mt-4 text-gray-400 text-sm">
                                Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} Blogs
                            </div>
                        </>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 mt-12 py-8 border-t border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="text-center md:text-left">
                                <p className="text-gray-400 text-sm">© 2025 NewYorkLore. All rights reserved.</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex justify-center md:justify-end space-x-6">
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">About</a>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy</a>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <ToastContainer />
        </>
    );
};

export default Blogs;