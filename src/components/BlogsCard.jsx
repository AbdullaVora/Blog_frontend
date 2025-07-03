// import React from "react";
// import { FaRegEdit, FaPlay } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { BiUser } from "react-icons/bi";
// import { Link } from "react-router-dom";


// const BlogsCard = ({ blog, onDelete }) => {
//   // console.log("Blog Card Rendered - Full Blog Data:", blog);

//   if (!blog) {
//     console.log("Blog is undefined");
//     return null;
//   }

//   const handleDelete = (e) => {
//     e.preventDefault();
//     onDelete(blog._id); // Use _id instead of id
//   };

//   // Handle media URL - it's a string in your data but component expects an object
//   const mediaUrl = typeof blog.media === 'string' ? blog.media : blog.media?.url;

//   return (
//     <article className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-900/30 hover:-translate-y-2 hover:border-emerald-600 group">
//       {/* Media Container */}
//       <div className="relative h-56 bg-gray-700 overflow-hidden">
//         {mediaUrl ? (
//           <img
//             src={mediaUrl}
//             alt="Blog media"
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-600 flex items-center justify-center">
//             No media available
//           </div>
//         )}

//         {/* Content Type Badge */}
//         <div className="absolute top-3 left-3">
//           <span
//             className={`px-2 py-1 text-xs font-medium rounded-full
//                 ${blog.category === "Article"
//                 ? "bg-blue-600"
//                 : blog.category === "Poems"
//                   ? "bg-purple-600"
//                   : blog.category === "blog"
//                     ? "bg-green-600"
//                     : "bg-gray-600"} text-white`}
//           >
//             {(blog.category || 'blog').toUpperCase()}
//           </span>
//         </div>

//         {/* Admin Actions - Top Right */}
//         <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button
//             className="p-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-500 transition-colors shadow-lg"
//             onClick={handleDelete}
//           >
//             <RiDeleteBin6Line size={16} />
//           </button>
//           <Link
//             to={`/editblog/${blog._id}`}  // Use _id here
//             className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors shadow-lg"
//           >
//             <FaRegEdit size={16} />
//           </Link>
//         </div>
//       </div>

//       {/* Content Container */}
//       <div className="p-6">
//         {/* Meta Information */}
//         <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
//           <div className="flex items-center gap-3">
//             <span className="text-emerald-400">•</span>
//             <span>
//               {new Date(blog.createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Title and Subtitle */}
//         <div className="mb-3">
//           <h3 className="text-xl font-bold text-emerald-400 mb-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
//             {blog.title || "Untitled Blog"}
//           </h3>
//         </div>

//         {/* Description */}
//         <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
//           {blog.description || "No description available"}
//         </p>

//         {/* Bottom Section */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-700">
//           {/* Author */}
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-sm font-medium">
//               {(blog.author || "A").charAt(0).toUpperCase()}
//             </div>
//             <div className="flex items-center gap-1 text-sm text-gray-300">
//               <BiUser className="text-emerald-400" />
//               <span>{blog.author || "Anonymous"}</span>
//             </div>
//           </div>

//           {/* Read More Button */}
//           <Link
//             to={`/blog/${blog._id}`}  // Use _id here
//             className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25"
//           >
//             Read More
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default BlogsCard;

// import React, { useState } from "react";
// import { FaRegEdit, FaPlay, FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { BiUser } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { updateBlog } from "../redux/slices/blogSlice";

// const BlogsCard = ({ blog, onDelete }) => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   const [commentText, setCommentText] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const [showCommentForm, setShowCommentForm] = useState(false);

//   if (!blog) {
//     return null;
//   }

//   // Check if current user has liked the blog
//   const userLiked = isAuthenticated && blog.likes?.includes(user.id);

//   const handleDelete = (e) => {
//     e.preventDefault();
//     onDelete(blog._id);
//   };

//   const handleLike = () => {
//     if (!isAuthenticated) {
//       alert("Please login to like this blog");
//       return;
//     }

//     const updatedLikes = userLiked
//       ? blog.likes.filter((id) => id !== user.id) // Unlike
//       : [...(blog.likes || []), user.id]; // Like

//     dispatch(updateBlog({
//       id: blog._id,
//       updateData: { likes: updatedLikes }
//     }));
//   };

//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       alert("Please login to comment");
//       return;
//     }

//     if (!commentText.trim()) {
//       alert("Comment cannot be empty");
//       return;
//     }

//     const newComment = {
//       user: user.id,
//       text: commentText,
//       createdAt: new Date().toISOString()
//     };

//     dispatch(updateBlog({
//       id: blog._id,
//       updateData: {
//         comments: [...(blog.comments || [])],
//         comment: newComment // This will be handled by backend to add to comments array
//       }
//     }));

//     setCommentText("");
//     setShowCommentForm(false);
//   };

//   const mediaUrl = typeof blog.media === 'string' ? blog.media : blog.media?.url;

//   return (
//     <article className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-900/30 hover:-translate-y-2 hover:border-emerald-600 group">
//       {/* Media Container */}
//       <div className="relative h-56 bg-gray-700 overflow-hidden">
//         {mediaUrl ? (
//           <img
//             src={mediaUrl}
//             alt="Blog media"
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-600 flex items-center justify-center">
//             No media available
//           </div>
//         )}

//         {/* Content Type Badge */}
//         <div className="absolute top-3 left-3">
//           <span
//             className={`px-2 py-1 text-xs font-medium rounded-full
//                 ${blog.category === "Article"
//                 ? "bg-blue-600"
//                 : blog.category === "Poems"
//                   ? "bg-purple-600"
//                   : blog.category === "blog"
//                     ? "bg-green-600"
//                     : "bg-gray-600"} text-white`}
//           >
//             {(blog.category || 'blog').toUpperCase()}
//           </span>
//         </div>

//         {/* Admin Actions - Top Right */}
//         <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button
//             className="p-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-500 transition-colors shadow-lg"
//             onClick={handleDelete}
//           >
//             <RiDeleteBin6Line size={16} />
//           </button>
//           <Link
//             to={`/editblog/${blog._id}`}
//             className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors shadow-lg"
//           >
//             <FaRegEdit size={16} />
//           </Link>
//         </div>
//       </div>

//       {/* Content Container */}
//       <div className="p-6">
//         {/* Meta Information */}
//         <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
//           <div className="flex items-center gap-3">
//             <span className="text-emerald-400">•</span>
//             <span>
//               {new Date(blog.createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Title and Subtitle */}
//         <div className="mb-3">
//           <h3 className="text-xl font-bold text-emerald-400 mb-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
//             {blog.title || "Untitled Blog"}
//           </h3>
//         </div>

//         {/* Description */}
//         <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
//           {blog.description || "No description available"}
//         </p>

//         {/* Like and Comment Buttons */}
//         <div className="flex items-center gap-4 mb-4">
//           <button
//             onClick={handleLike}
//             className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
//           >
//             {isAuthenticated ? (
//               <FaHeart className="text-red-500" />
//             ) : (
//               <FaRegHeart />
//             )}
//             <span>{blog.likes?.length || 0}</span>
//           </button>

//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors"
//           >
//             <FaRegComment />
//             <span>{blog.comments?.length || 0}</span>
//           </button>

//           {isAuthenticated && (
//             <button
//               onClick={() => setShowCommentForm(!showCommentForm)}
//               className="text-sm text-emerald-400 hover:text-emerald-300 ml-auto"
//             >
//               Add Comment
//             </button>
//           )}
//         </div>

//         {/* Comment Form */}
//         {showCommentForm && (
//           <form onSubmit={handleAddComment} className="mb-4">
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Write your comment..."
//               className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
//               rows="3"
//             />
//             <div className="flex justify-end gap-2 mt-2">
//               <button
//                 type="button"
//                 onClick={() => setShowCommentForm(false)}
//                 className="px-3 py-1 bg-gray-600 text-gray-200 rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 onClick={handleAddComment}
//                 className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-500"
//               >
//                 Post
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Comments Section */}
//         {showComments && blog.comments?.length > 0 && (
//           <div className="mb-4 border-t border-gray-700 pt-4">
//             <h4 className="text-sm font-medium text-gray-300 mb-3">Comments ({blog.comments.length})</h4>
//             <div className="space-y-3">
//               {blog.comments.map((comment, index) => (
//                 <div key={index} className="bg-gray-700 p-3 rounded-lg">
//                   <div className="flex items-center gap-2 mb-1">
//                     <div className="w-6 h-6 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-xs font-medium">
//                       {comment.name?.charAt(0).toUpperCase() || 'U'}
//                     </div>
//                     <span className="text-sm font-medium text-gray-200">
//                       {comment.name || 'Unknown'}
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       {new Date(comment.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-300 pl-8">{comment.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Bottom Section */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-700">
//           {/* Author */}
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-sm font-medium">
//               {(blog.author || "A").charAt(0).toUpperCase()}
//             </div>
//             <div className="flex items-center gap-1 text-sm text-gray-300">
//               <BiUser className="text-emerald-400" />
//               <span>{blog.author || "Anonymous"}</span>
//             </div>
//           </div>

//           {/* Read More Button */}
//           <Link
//             to={`/blog/${blog._id}`}
//             className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25"
//           >
//             Read More
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default BlogsCard;

import React, { useState } from "react";
import { FaRegEdit, FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog } from "../redux/slices/blogSlice";
import { toast, ToastContainer } from "react-toastify";

const BlogsCard = ({ blog, onDelete }) => {
  console.log("Blog Card Rendered - Full Blog Data:", blog);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log(user)

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  if (!blog) {
    return null;
  }

  // Check if current user has liked the blog
  const userLiked =
    isAuthenticated &&
    Array.isArray(blog.likes) &&
    blog.likes.some(
      like => like != null && user?.userId && like.toString() === user.userId.toString()
    );

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(blog._id);
  };


  const handleLike = async () => {
    if (!isAuthenticated || !user?.userId) {
      toast.error("Please login to like this blog", { autoClose: 1000 });
      return;
    }

    try {
      setIsLiking(true);
      const updatedLikes = userLiked
        ? blog.likes.filter(id => id.toString() !== user.userId.toString())
        : [...(blog.likes || []), user.userId];

      // Only send the likes field to update
      await dispatch(updateBlog({
        blogId: blog._id,
        blogData: {
          likes: updatedLikes
        }
      })).unwrap();
    } catch (error) {
      console.error("Failed to update likes:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // const handleAddComment = async (e) => {
  //   e.preventDefault();
  //   if (!isAuthenticated || !user?.userId) {
  //     alert("Please login to comment");
  //     return;
  //   }

  //   if (!commentText.trim()) {
  //     alert("Comment cannot be empty");
  //     return;
  //   }

  //   try {
  //     setIsCommenting(true);
  //     const newComment = {
  //       user: user.userId,
  //       comment: commentText,
  //       createdAt: new Date()
  //     };

  //     await dispatch(updateBlog({
  //       blogId: blog._id,
  //       blogData: {
  //         comments: newComment
  //       }
  //     })).unwrap();

  //     setCommentText("");
  //     setShowCommentForm(false);
  //   } catch (error) {
  //     console.error("Failed to add comment:", error);
  //   } finally {
  //     setIsCommenting(false);
  //   }
  // };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !user?.userId) {
      alert("Please login to comment");
      return;
    }

    if (!commentText.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      setIsCommenting(true);
      const newComment = {
        user: user.userId,
        name: user.name || "Anonymous", // Use user's name or fallback to "Anonymous"
        comment: commentText
      };

      await dispatch(updateBlog({
        blogId: blog._id,
        blogData: {
          comments: newComment
        }
      })).unwrap();

      setCommentText("");
      setShowCommentForm(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  const mediaUrl = typeof blog.media === 'string' ? blog.media : blog.media?.url;

  return (
    <>
      <article className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-emerald-900/30 hover:-translate-y-2 hover:border-emerald-600 group">
        {/* Media Container */}
        <div className="relative h-56 bg-gray-700 overflow-hidden">
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


          {/* Content Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full
                ${blog.category === "Article"
                  ? "bg-blue-600"
                  : blog.category === "Poems"
                    ? "bg-purple-600"
                    : blog.category === "blog"
                      ? "bg-green-600"
                      : "bg-gray-600"} text-white`}
            >
              {(blog.category || 'blog').toUpperCase()}
            </span>
          </div>

          {/* Admin Actions - Top Right */}
          {user?.role === "admin" && (
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="p-2 rounded-full cursor-pointer bg-red-600 hover:bg-red-500 transition-colors shadow-lg"
                onClick={handleDelete}
                aria-label="Delete blog"
              >
                <RiDeleteBin6Line size={16} />
              </button>
              <Link
                to={`/editblog/${blog._id}`}
                className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-500 transition-colors shadow-lg"
                aria-label="Edit blog"
              >
                <FaRegEdit size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">•</span>
              <span>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-emerald-400 mb-1 line-clamp-2 group-hover:text-emerald-300 transition-colors">
              {blog.title || "Untitled Blog"}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {blog.description || "No description available"}
          </p>

          {/* Like and Comment Buttons */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              aria-label={userLiked ? "Unlike this blog" : "Like this blog"}
            >
              {userLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
              <span>{blog.likes?.length || 0}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors"
              aria-label={showComments ? "Hide comments" : "Show comments"}
            >
              <FaRegComment />
              <span>{blog.comments?.length || 0}</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={() => setShowCommentForm(!showCommentForm)}
                className="text-sm text-emerald-400 hover:text-emerald-300 ml-auto"
                aria-label={showCommentForm ? "Cancel comment" : "Add comment"}
              >
                {showCommentForm ? "Cancel" : "Add Comment"}
              </button>
            )}
          </div>

          {/* Comment Form */}
          {showCommentForm && (
            <form onSubmit={handleAddComment} className="mb-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                rows="3"
                required
                disabled={isCommenting}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCommentForm(false)}
                  className="px-3 py-1 bg-gray-600 text-gray-200 rounded hover:bg-gray-500"
                  disabled={isCommenting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-500 disabled:opacity-50"
                  disabled={isCommenting || !commentText.trim()}
                >
                  {isCommenting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          )}

          {/* Comments Section */}
          {showComments && blog.comments?.length > 0 && (
            <div className="mb-4 border-t border-gray-700 pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Comments ({blog.comments.length})</h4>
              <div className="space-y-3">
                {blog.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-xs font-medium">
                        {comment.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-200">
                        {comment.name || 'Unknown'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 pl-8">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-emerald-200 flex items-center justify-center text-sm font-medium">
                {(blog.author || "A").charAt(0).toUpperCase()}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <BiUser className="text-emerald-400" />
                <span>{blog.author || "Anonymous"}</span>
              </div>
            </div>

            {/* Read More Button */}
            <Link
              to={`/blog/${blog._id}`}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25"
              aria-label="Read more about this blog"
            >
              Read More
            </Link>
          </div>
        </div>
      </article>
      <ToastContainer />
    </>
  );
};

export default BlogsCard;