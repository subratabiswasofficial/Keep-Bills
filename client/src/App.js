import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Navbar from './layouts/Navbar';
import StudentProfile from './pages/StudentProfile';
import StudentBills from './pages/StudentBills';
import Admin from './pages/Admin';
import GlobalAlert from './alerts/GlobalAlert';

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
    return (
        <Router>
            <Navbar menu={navMenu} />
            <GlobalAlert active={true} status="success" />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/bills" element={<StudentBills />} />
                <Route path="/dashboard" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;

/* 
https://www.youtube.com/watch?v=k2Zk5cbiZhg&ab_channel=TraversyMedia
*/
