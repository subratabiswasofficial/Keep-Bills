import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';

import Login from './pages/Login';
import Navbar from './layouts/Navbar';
import StudentProfile from './pages/StudentProfile';
import StudentBills from './pages/StudentBills';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Unauth from './pages/Unauth';
import GlobalAlert from './alerts/GlobalAlert';

import { testReducer } from './actions/auth';

const navMenu = [
    {
        title: 'PROFILE',
        path: '/profile'
    },
    {
        title: 'BILLS',
        path: '/bills'
    },
    {
        title: 'DASHBOARD',
        path: '/dashboard'
    },
    {
        title: 'LOGIN',
        path: '/'
    },
    {
        title: 'LOGOUT',
        path: '/logout'
    }
];

const App = () => {
    /* load user for first time */
    const loadUser = () => {
        console.log('Load user for first time');
        store.dispatch(testReducer('this is the app mf'));
    };

    useEffect(() => {
        loadUser();
    }, []);
    /* */

    return (
        <Provider store={store}>
            <Router>
                <Navbar menu={navMenu} />
                <GlobalAlert active={false} type="success" />
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* Private Route at React V6 */}
                    <Route path="/test" element={<PrivateRoute />}>
                        <Route path="/test" element={<StudentProfile />} />
                    </Route>
                    <Route path="/profile" element={false ? <StudentProfile /> : <Unauth />} />
                    <Route path="/bills" element={<StudentBills />} />
                    {/* Using Auth provider scope */}
                    <Route
                        path="/dashboard"
                        element={
                            <AuthProvider scope="admin">
                                <Admin />
                            </AuthProvider>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;

/* 
https://www.youtube.com/watch?v=k2Zk5cbiZhg&ab_channel=TraversyMedia
*/
