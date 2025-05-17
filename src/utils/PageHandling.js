import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageHandling = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Get authentication status and role
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');

        if (!isAuthenticated) {
            navigate('/home');
            return;
        }

        // Redirect based on role
        if (isAdmin) {
            navigate('/dashboard');
        } else {
            navigate('/fine-issure-page');
        }
    }, [navigate]);

    return null;
};

export default PageHandling;
