import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../redux/slices/blogSlice";
import BlogsCard from "../components/BlogsCard";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, loading: BlogLoad } = useSelector((state) => state.blogs);

  // Directly compute values from Redux state instead of local state
  const allBlogs = blogs || [];
  console.log("All Blogs:", allBlogs);
  const displayedBlogs = allBlogs.slice(0, 6);
  const loading = BlogLoad;
  const error = !BlogLoad && allBlogs.length === 0 ? "No Blogs found" : null;

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // console.log("All Blogs:", allBlogs);

  const deleteBlogs = async (id) => {
    try {
      await dispatch(deleteBlog(id));
      toast.success("Blog deleted", { position: "top-right" });
      dispatch(getBlogs()); // Refresh the blogs list after deletion
    } catch (err) {
      console.error("Error deleting story:", err);
      toast.error("Failed to delete story", { position: "top-right" });
    }
  };

  const handleLoadMore = () => {
    navigate('/blogs');
  };

  console.log("Displayed Blogs:", displayedBlogs);

  return (
    <>
      <Helmet>
        <title>The Daily Blogs – Discover the Untold Blogs</title>
        <meta name="description" content="A The Daily Blogs platform showcasing New York's hidden street-art, urban legends, and community Blogs—through photos, videos, poems, sketches, and interactive features." />
      </Helmet>

      <div className="min-h-screen bg-gray-900 text-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-400 sm:text-4xl sm:tracking-tight lg:text-5xl">
              Welcome To The Daily Blogs
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
              Explore the latest articles, poems and Blogs.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center mt-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
            </div>
          )}

          {error && (
            <div className="mt-12 text-center">
              <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="mt-12 flex flex-wrap gap-6">
              {displayedBlogs.length > 0 ? (
                displayedBlogs.map((blog) => (
                  <div className="w-full sm:w-[45%] lg:w-[32%]">
                    <BlogsCard key={blog._id} blog={blog} onDelete={deleteBlogs} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-gray-400 text-lg">No Blogs found.</p>
                </div>
              )}
            </div>
          )}

          {!loading && !error && allBlogs.length > 0 && allBlogs.length > displayedBlogs.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-emerald-600 text-gray-300 hover:text-emerald-400 font-medium rounded-lg transition-all duration-300"
              >
                Load More Blogs
              </button>
            </div>
          )}
        </main>
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;