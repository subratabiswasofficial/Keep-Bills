import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = false;
    return auth ? <Outlet /> : <Navigate to="/401" />;
};
export default PrivateRoute;
