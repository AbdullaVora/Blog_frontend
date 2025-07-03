import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, tokenVerified, authLoading } = useAuth();
    const { user } = useSelector((state) => state.user);

        // if (authLoading || !tokenVerified) {
        //     return <div>Loading...</div>;
        // }

    if (!isAuthenticated && user?.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;