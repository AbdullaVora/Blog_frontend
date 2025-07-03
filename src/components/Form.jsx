// import { Helmet } from "react-helmet";
// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
// import { addBlog, getBlogById, updateBlog } from "../redux/slices/blogSlice";
// import { useDispatch } from "react-redux";



// const BlogForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const dispatch = useDispatch()


//   const [blogForm, setblogForm] = useState({
//     title: "",
//     author: "",
//     description: "",
//     category: "",
//     tags: [],
//     media: null,
//   });

//   const [blogList, setblogList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showblogList, setShowblogList] = useState(false);
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     if (id) {
//       handleEditFromParams(id);
//     } else {
//       resetForm();
//       setShowblogList(true);
//     }
//   }, [id])


//   const handleEditFromParams = async (id) => {
//     try {
//       const blogData = await dispatch(getBlogById(id));
//       console.log("blogData", blogData);
//       if (blogData) {
//         setblogForm({
//           title: blogData.payload.blog.title || "",
//           author: blogData.payload.blog.author || "",
//           description: blogData.payload.blog.description || "",
//           category: blogData.payload.blog.category || "",
//           tags: blogData.payload.blog.tags || [],
//           media: blogData.payload.blog.media || null,
//         });
//         setEditingId(id);
//         setShowblogList(false);
//       }
//     } catch (error) {
//       toast.error("Failed to load Blog", { position: "top-right" });
//       console.error("Edit from params error:", error);
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   if (name === "tags") {
//   //     const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
//   //     setblogForm((prev) => ({ ...prev, tags: tagsArray }));
//   //     return;
//   //   }
//   //   setblogForm((prev) => ({ ...prev, [name]: value }));
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "tags") {
//       let tagsArray;

//       // If value contains commas, split by commas
//       if (value.includes(',')) {
//         tagsArray = value
//           .split(',')
//           .map(tag => tag.trim())
//           .filter(tag => tag.length > 0);
//       }
//       // Otherwise, split by spaces but be smart about it
//       else {
//         // Split by multiple spaces or single space, but preserve multi-word tags
//         tagsArray = value
//           .split(/\s{2,}|\s+(?=[A-Z])|(?<=\w)\s+(?=\w*$)/) // Complex regex for smart splitting
//           .map(tag => tag.trim())
//           .filter(tag => tag.length > 0);
//       }

//       setblogForm(prev => ({ ...prev, tags: tagsArray }));
//       return;
//     }
//     setblogForm(prev => ({ ...prev, [name]: value }));
//   };



//   const handleMediaChange = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];

//       if (!file.type.match('image.*') && !file.type.match('video.*') && !file.type.match('gif.*')) {
//         toast.error("Only images, videos, and gifs are allowed");
//         return;
//       }

//       try {
//         // const toastId = toast.loading("Uploading media...", { position: "top-right" });

//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const base64 = reader.result;
//           if (!base64) {
//             toast.error("Failed to read file");
//             return;
//           }

//           setblogForm((prev) => ({
//             ...prev,
//             media: base64,
//           }));

//         };

//         reader.readAsDataURL(file); // ✅ Correct position
//       } catch (error) {
//         toast.error(`Upload failed: ${error.message}`);
//         console.error("Upload error:", error);
//       }
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (editingId) {
//         const data = await dispatch(updateBlog({ blogId: editingId, blogData: blogForm }));
//         if (data) {
//           toast.success("Blog updated successfully");
//           resetForm();
//           navigate("/");
//         }
//       } else {
//         const data = await dispatch(addBlog(blogForm));
//         // console.log("data", data);
//         if (data) {
//           toast.success("Blog added successfully");
//           // resetForm();
//         }
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.");
//       console.error("Submission error:", error);
//     } finally {
//       setLoading(false);
//       resetForm();
//       navigate("/");
//     }
//   };

//   const resetForm = () => {
//     setblogForm({
//       title: "",
//       decsription: "",
//       author: "",
//       category: "",
//       tags: [],
//       media: null,
//     });
//     setEditingId(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const removeMedia = () => {
//     setblogForm(prev => ({ ...prev, media: null }));
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const cancelEdit = () => {
//     resetForm();
//     navigate("/");
//     toast.info("Edit cancelled");
//   };


//   const renderMediaPreview = (media) => {
//     if (!media) return null;
//     console.log("renderMediaPreview", media);

//     // Handle base64 images
//     if (media.startsWith('data:image')) {
//       return (
//         <img
//           src={media}
//           className="w-full h-[350px] rounded-md"
//           alt="Blog media preview"
//         />
//       );
//     }


//     // Handle case where media is just a URL string
//     if (typeof media === 'string') {
//       const extension = media.split('.').pop().toLowerCase();
//       const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);

//       return isImage ? (
//         <img
//           src={media}
//           className="w-full h-[350px] rounded-md"
//           alt="Blog media"
//         />
//       ) : (
//         <video
//           src={media}
//           className="w-full h-[350px] rounded-md"
//           autoPlay
//           muted
//           loop
//         />
//       );
//     }

//     return null;
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Create Blog</title>
//         <meta name="description" content="Share your New York blog through photos, videos, and more." />
//       </Helmet>
//       <div className="flex items-center justify-center min-h-screen py-5 bg-gray-900 text-white px-10">
//         <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
//             {editingId ? "Edit Blog" : "Add New Blog"}
//           </h2>

//           {editingId && (
//             <div className="text-center mb-4">
//               <button
//                 onClick={cancelEdit}
//                 className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition"
//               >
//                 Cancel Edit
//               </button>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Blog Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                   value={blogForm.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Blog Author</label>
//                 <input
//                   type="text"
//                   name="author"
//                   className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                   value={blogForm.author}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Category</label>
//                 <select
//                   name="category"
//                   value={blogForm.category}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
//                   required
//                 >
//                   <option value="">Select a Catgeory</option>
//                   <option value="Article">Article</option>
//                   <option value="Poems">Poems</option>
//                   <option value="blog">blog</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Tags</label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={displayTags()} // Show tags separated by spaces
//                   onChange={handleChange}
//                   placeholder="Enter tags separated by spaces or commas"
//                   className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300">
//                   {blogForm.media ? "Replace Media" : "Upload Image or Video"}
//                 </label>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*,video/*, gif/*"
//                   disabled={loading}
//                   className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer disabled:opacity-50"
//                   onChange={handleMediaChange}
//                 />
//                 <p className="text-xs text-gray-400 mt-1">Supports images and videos (max 5MB)</p>

//                 {blogForm.media && (
//                   <div className="mb-4 mt-2">
//                     {/* {blogForm.media.fileType === 'image' ? (
//                         <AdvancedImage
//                           key={`img-${blogForm.media.publicId}`}
//                           cldImg={cld.image(blogForm.media.publicId)}
//                           className="w-full h-auto rounded-md"
//                           alt="Blog media"
//                         />
//                       ) : (
//                         <AdvancedVideo
//                           key={`vid-${blogForm.media.publicId}`}
//                           cldVid={cld.video(blogForm.media.publicId)}
//                           className="w-full h-auto rounded-md"
//                           autoPlay
//                           muted
//                           loop
//                         />
//                       )} */}
//                     {renderMediaPreview(blogForm.media)}
//                     <button
//                       type="button"
//                       onClick={removeMedia}
//                       className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-400 transition"
//                     >
//                       Remove Media
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300">Blog Description</label>
//               <textarea
//                 name="description"
//                 className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
//                 value={blogForm.description}
//                 onChange={handleChange}
//                 required
//               ></textarea>
//               {/* <button
//                 type="submit"
//                 className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition mt-4"
//                 disabled={isUploading}
//               >
//                 {editingId ? "Update Blog" : "Add Blog"}
//               </button> */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={` w-full px-4 py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//                   } text-white`}
//               >
//                 {loading ? "Submitting..." : editingId ? "Update Blog" : "Add Blog"}
//               </button>
//               <Link to="/blogs">
//                 <button
//                   type="button"
//                   className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
//                 >
//                   Show All blog
//                 </button>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// };

// export default BlogForm;
import { Helmet } from "react-helmet";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { addBlog, getBlogById, updateBlog } from "../redux/slices/blogSlice";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()

  const [blogForm, setblogForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    tags: [],
    media: null,
  });

  // Separate state for tags input display
  const [tagsInput, setTagsInput] = useState("");

  const [blogList, setblogList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showblogList, setShowblogList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false); // Switch between file upload and URL input
  const [mediaUrl, setMediaUrl] = useState(""); // Store URL input

  useEffect(() => {
    if (id) {
      handleEditFromParams(id);
    } else {
      resetForm();
      setShowblogList(true);
    }
  }, [id])

  const handleEditFromParams = async (id) => {
    try {
      const blogData = await dispatch(getBlogById(id));
      console.log("blogData", blogData);
      if (blogData) {
        const tags = blogData.payload.blog.tags || [];
        setblogForm({
          title: blogData.payload.blog.title || "",
          author: blogData.payload.blog.author || "",
          description: blogData.payload.blog.description || "",
          category: blogData.payload.blog.category || "",
          tags: tags,
          media: blogData.payload.blog.media || null,
        });
        // Set the tags input display
        setTagsInput(tags.join(", "));

        // Handle media URL if it exists and is a string URL
        if (blogData.payload.blog.media && typeof blogData.payload.blog.media === 'string' && !blogData.payload.blog.media.startsWith('data:')) {
          setIsUrlMode(true);
          setMediaUrl(blogData.payload.blog.media);
        } else {
          setIsUrlMode(false);
          setMediaUrl("");
        }

        setEditingId(id);
        setShowblogList(false);
      }
    } catch (error) {
      toast.error("Failed to load Blog", { position: "top-right" });
      console.error("Edit from params error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setblogForm(prev => ({ ...prev, [name]: value }));
  };

  // Enhanced tags handling function
  const handleTagsChange = (e) => {
    const value = e.target.value;
    setTagsInput(value);

    // Parse tags from input - split by comma, semicolon, or multiple spaces
    const tagsArray = value
      .split(/[,;]|\s{2,}/) // Split by comma, semicolon, or 2+ spaces
      .map(tag => tag.trim()) // Remove extra spaces
      .filter(tag => tag.length > 0); // Remove empty strings

    setblogForm(prev => ({ ...prev, tags: tagsArray }));
  };

  // Handle Enter key and other special cases for tags
  const handleTagsKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Add current input as tag and clear input
      const currentInput = tagsInput.trim();
      if (currentInput) {
        const newTags = [...blogForm.tags];
        // Check if tag already exists
        if (!newTags.includes(currentInput)) {
          newTags.push(currentInput);
          setblogForm(prev => ({ ...prev, tags: newTags }));
        }
        setTagsInput("");
      }
    }
  };

  // Remove individual tag
  const removeTag = (indexToRemove) => {
    const newTags = blogForm.tags.filter((_, index) => index !== indexToRemove);
    setblogForm(prev => ({ ...prev, tags: newTags }));
    // Update input display
    setTagsInput(newTags.join(", "));
  };

  // Handle URL input change
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setMediaUrl(url);

    // Validate URL format
    if (url.trim()) {
      try {
        new URL(url);
        setblogForm(prev => ({ ...prev, media: url }));
      } catch (error) {
        // Invalid URL, don't update form
        console.log("Invalid URL format");
      }
    } else {
      setblogForm(prev => ({ ...prev, media: null }));
    }
  };

  // Toggle between file upload and URL input
  const toggleInputMode = () => {
    setIsUrlMode(!isUrlMode);
    // Clear media when switching modes
    setblogForm(prev => ({ ...prev, media: null }));
    setMediaUrl("");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleMediaChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match('image.*') && !file.type.match('video.*') && !file.type.match('gif.*')) {
        toast.error("Only images, videos, and gifs are allowed");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          if (!base64) {
            toast.error("Failed to read file");
            return;
          }

          setblogForm((prev) => ({
            ...prev,
            media: base64,
          }));
        };

        reader.readAsDataURL(file);
      } catch (error) {
        toast.error(`Upload failed: ${error.message}`);
        console.error("Upload error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const data = await dispatch(updateBlog({ blogId: editingId, blogData: blogForm }));
        if (data) {
          toast.success("Blog updated successfully");
          resetForm();
          navigate("/");
        }
      } else {
        const data = await dispatch(addBlog(blogForm));
        if (data) {
          toast.success("Blog added successfully");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
      resetForm();
      navigate("/");
    }
  };

  const resetForm = () => {
    setblogForm({
      title: "",
      description: "", // Fixed typo: was "decsription"
      author: "",
      category: "",
      tags: [],
      media: null,
    });
    setTagsInput(""); // Reset tags input
    setMediaUrl(""); // Reset URL input
    setIsUrlMode(false); // Reset to file upload mode
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeMedia = () => {
    setblogForm(prev => ({ ...prev, media: null }));
    setMediaUrl("");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const cancelEdit = () => {
    resetForm();
    navigate("/");
    toast.info("Edit cancelled");
  };

  const renderMediaPreview = (media) => {
    if (!media) return null;
    console.log("renderMediaPreview", media);

    // Handle base64 images
    if (media.startsWith('data:image')) {
      return (
        <img
          src={media}
          className="w-full h-[350px] rounded-md"
          alt="Blog media preview"
        />
      );
    }

    // Handle case where media is just a URL string
    if (typeof media === 'string') {
      const extension = media.split('.').pop().toLowerCase();
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);

      return isImage ? (
        <img
          src={media}
          className="w-full h-[350px] rounded-md"
          alt="Blog media"
        />
      ) : (
        <video
          src={media}
          className="w-full h-[350px] rounded-md"
          autoPlay
          muted
          loop
        />
      );
    }

    return null;
  };

  return (
    <>
      <Helmet>
        <title>Create Blog</title>
        <meta name="description" content="Share your New York blog through photos, videos, and more." />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen py-5 bg-gray-900 text-white px-10">
        <div className="w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
            {editingId ? "Edit Blog" : "Add New Blog"}
          </h2>

          {editingId && (
            <div className="text-center mb-4">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400 transition"
              >
                Cancel Edit
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                  value={blogForm.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Blog Author</label>
                <input
                  type="text"
                  name="author"
                  className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                  value={blogForm.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Category</label>
                <select
                  name="category"
                  value={blogForm.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="Article">Article</option>
                  <option value="Poems">Poems</option>
                  <option value="blog">Blog</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={tagsInput}
                  onChange={handleTagsChange}
                  onKeyDown={handleTagsKeyDown}
                  placeholder="Enter tags separated by commas, semicolons, or press Enter"
                  className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Separate tags with commas, semicolons, or press Enter to add
                </p>

                {/* Display current tags */}
                {blogForm.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {blogForm.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs bg-green-600 text-white rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1 text-white hover:text-red-200 focus:outline-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    {blogForm.media ? "Replace Media" : "Add Media"}
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${!isUrlMode ? 'text-green-400' : 'text-gray-400'}`}>
                      Upload File
                    </span>
                    <button
                      type="button"
                      onClick={toggleInputMode}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isUrlMode ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isUrlMode ? 'translate-x-5' : 'translate-x-1'
                          }`}
                      />
                    </button>
                    <span className={`text-xs ${isUrlMode ? 'text-green-400' : 'text-gray-400'}`}>
                      Online URL
                    </span>
                  </div>
                </div>

                {isUrlMode ? (
                  <div>
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={handleUrlChange}
                      placeholder="Enter image or video URL (e.g., https://example.com/image.jpg)"
                      className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter a direct URL to an image or video file
                    </p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*,video/*,gif/*"
                      disabled={loading}
                      className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none cursor-pointer disabled:opacity-50"
                      onChange={handleMediaChange}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Supports images and videos (max 5MB)
                    </p>
                  </div>
                )}

                {blogForm.media && (
                  <div className="mb-4 mt-2">
                    {renderMediaPreview(blogForm.media)}
                    <button
                      type="button"
                      onClick={removeMedia}
                      className="mt-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-400 transition"
                    >
                      Remove Media
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Blog Description</label>
              <textarea
                name="description"
                className="w-full h-[375px] px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-green-500 outline-none resize-none"
                value={blogForm.description}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 rounded mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                  } text-white`}
              >
                {loading ? "Submitting..." : editingId ? "Update Blog" : "Add Blog"}
              </button>

              <Link to="/blogs">
                <button
                  type="button"
                  className="w-full mt-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-400 transition"
                >
                  Show All Blogs
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BlogForm;