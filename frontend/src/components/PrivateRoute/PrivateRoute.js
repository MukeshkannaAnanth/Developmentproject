// PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth);
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes

