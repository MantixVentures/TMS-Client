import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        isInitialized: false
    });

    // Initialize auth state synchronously before first render
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Initial auth check - Token exists:', !!token);
        
        setAuth({
            user: token ? { token } : null,
            isInitialized: true
        });
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        console.log("user data:",userData);
        setAuth({
            user: userData,
            isInitialized: true
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            user: null,
            isInitialized: true
        });
    };

    return (
        <AuthContext.Provider value={{ 
            user: auth.user, 
            isInitialized: auth.isInitialized,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};