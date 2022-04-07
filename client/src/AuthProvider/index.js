// function RequireAuth({ children }: { children: JSX.Element }) {
//     let auth = useAuth();
//     let location = useLocation();

//     if (!auth.user) {
//         // Redirect them to the /login page, but save the current location they were
//         // trying to go to when they were redirected. This allows us to send them
//         // along to that page after they login, which is a nicer user experience
//         // than dropping them off on the home page.
//         return <Navigate to="/login" state={{ from: location }} />;
//     }

//     return children;
// }

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
