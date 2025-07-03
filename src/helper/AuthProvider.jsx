import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyToken } from '../redux/slices/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, tokenVerified, loading } = useSelector(state => state.user);

    // Verify token on initial load and route changes
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Routes that authenticated users should NOT access (will redirect to home)
        const authOnlyRoutes = ['/login', '/signup'];
        
        // Routes that everyone can access (no authentication required)
        const publicRoutes = ['/', '/blogs', '/blog/:id'];
        
        // Check route types
        const isAuthOnlyRoute = authOnlyRoutes.includes(location.pathname);
        const isPublicRoute = publicRoutes.includes(location.pathname) || 
                             location.pathname.startsWith('/blog/'); // Handle dynamic blog routes
        const isProtectedRoute = !isAuthOnlyRoute && !isPublicRoute;

        if (token) {
            // User has token, verify it
            dispatch(verifyToken())
                .unwrap()
                .then(() => {
                    // If authenticated and trying to access login/signup, redirect to home
                    if (isAuthOnlyRoute) {
                        navigate('/');
                    }
                    // If authenticated and on public/protected routes, allow access
                })
                .catch(() => {
                    // Token verification failed, clear token
                    localStorage.removeItem('token');
                    // If trying to access protected route, redirect to login
                    if (isProtectedRoute) {
                        navigate('/login');
                    }
                    // If on public routes, stay there
                });
        } else {
            // No token
            // If trying to access protected route, redirect to login
            if (isProtectedRoute) {
                navigate('/login');
            }
            // If on public routes or auth-only routes, allow access
        }
    }, [dispatch, navigate, location.pathname]);

    const value = {
        isAuthenticated,
        tokenVerified,
        authLoading: loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);