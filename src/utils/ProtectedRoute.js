import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user, isInitialized } = useAuth();
    const location = useLocation();

    console.log('ProtectedRoute check:', { 
        isInitialized, 
        user, 
        hasToken: !!localStorage.getItem('token') 
    });

    if (!isInitialized) {
        return null;
    }

    if (!user) {
        console.warn('Redirecting to login - No user found');
        return <Navigate to="/driver-login" state={{ from: location }} replace />;
    }

    return children;
};