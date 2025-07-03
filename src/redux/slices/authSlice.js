import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../../api/apiInstance';


export const register = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/auth/register', userData);
            console.log(response);
            if (response.status !== 201) {
                throw new Error('Failed to register user');
            }
            return response;
        } catch (error) {
            console.error('Error in register:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiInstance.post('/auth/login', credentials);
            if (response.status !== 200) {
                throw new Error('Failed to login user');
            }
            return response;
        } catch (error) {
            console.error('Error in login:', error);
            return rejectWithValue(error);
        }
    }
);

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get('/auth/users');
            if (response.status !== 200) {
                throw new Error('Failed to fetch users');
            }
            return response.data;
        } catch (error) {
            console.error('Error in getUsers:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await apiInstance.put(`/auth/updateUser/${userId}`, userData);
            if (response.status !== 200) {
                throw new Error('Failed to update user');
            }
            return response.data;
        } catch (error) {
            console.error('Error in updateUser:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiInstance.delete(`/auth/deleteUser/${userId}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete user');
            }
            return response.data;
        } catch (error) {
            console.error('Error in deleteUser:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Add this to your existing userSlice file
export const verifyToken = createAsyncThunk(
    'user/verifyToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }

            const response = await apiInstance.post('/auth/verifyToken', {
                token: JSON.parse(localStorage.getItem('token'))
            });

            if (response.status !== 200) {
                throw new Error('Token verification failed');
            }
            return response.data; // Should contain id, name, role
        } catch (error) {
            console.error('Error in verifyToken:', error);
            localStorage.removeItem('token');
            return rejectWithValue(error.response?.data || 'Token verification failed');
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    tokenVerified: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.tokenVerified = false;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Assuming your API returns { user: { id, name, role } }
                console.log("User verified:", action.payload);
                state.isAuthenticated = true;
                state.tokenVerified = true;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.tokenVerified = true;
                localStorage.removeItem('token');
            });
    }
})

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;