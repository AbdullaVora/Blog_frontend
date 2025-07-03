import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";


export const addBlog = createAsyncThunk("blog/addBlog", async (blogData, { rejectWithValue }) => {
    try {
        const response = await apiInstance.post("/addBlog", blogData);
        if (response.status !== 200) {
            throw new Error("Failed to add blog");
        }
        return response.data;
    } catch (error) {
        console.error("Error in addBlog:", error);
        return rejectWithValue(error.response.data);
    }
})

export const getBlogs = createAsyncThunk("blog/getBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await apiInstance.get("/getBlogs");
        if (response.status !== 200) {
            throw new Error("Failed to fetch blogs");
        }
        return response.data;
    } catch (error) {
        console.error("Error in getBlogs:", error);
        return rejectWithValue(error.response.data);
    }
})

export const getBlogById = createAsyncThunk("blog/getBlogById", async (blogId, { rejectWithValue }) => {
    try {
        const response = await apiInstance.get(`/getBlogById/${blogId}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch blog by ID");
        }
        return response.data;
    } catch (error) {
        console.error("Error in getBlogById:", error);
        return rejectWithValue(error.response.data);
    }
})

export const updateBlog = createAsyncThunk("blog/updateBlog", async ({ blogId, blogData }, { rejectWithValue }) => {
    try {
        const response = await apiInstance.put(`/updateBlog/${blogId}`, blogData);
        if (response.status !== 200) {
            throw new Error("Failed to update blog");
        }
        return response.data;
    }
    catch (error) {
        console.error("Error in updateBlog:", error);
        return rejectWithValue(error.response.data);
    }
})

export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (blogId, { rejectWithValue }) => {
    try {
        const response = await apiInstance.delete(`/deleteBlog/${blogId}`);
        if (response.status !== 200) {
            throw new Error("Failed to delete blog");
        }
        return response.data;
    }
    catch (error) {
        console.error("Error in deleteBlog:", error);
        return rejectWithValue(error.response.data);
    }
})


const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.push(action.payload);
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Get blogs action payload:", action.payload.blogs);
                state.blogs = action.payload.blogs || []; // Ensure blogs is an array
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBlogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.loading = false;
                // Add safety checks
                if (!Array.isArray(state.blogs)) {
                    state.blogs = [];
                }

                const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                } else {
                    state.blogs.push(action.payload);
                }
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBlog = action.payload.blogs || action.payload; // Handle both response formats
                const index = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
                if (index !== -1) {
                    state.blogs[index] = updatedBlog;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = state.blogs.filter(blog => blog._id !== action.payload._id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})
export const blogReducer = blogSlice.reducer;
export const blogActions = blogSlice.actions;