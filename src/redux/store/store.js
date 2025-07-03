import { configureStore } from '@reduxjs/toolkit'
import { blogReducer } from "../slices/blogSlice"
import { userReducer } from '../slices/authSlice'

export const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer
    },
})
