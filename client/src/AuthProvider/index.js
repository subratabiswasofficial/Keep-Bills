import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthProvider = ({ children, scope }) => {
    const currentScope = 'admin';
    // const currentPass = true;
    console.log(scope === currentScope);
    if (currentScope !== scope) {
        return <Navigate to="/401" />;
    }
    return children;
};

export default AuthProvider;
