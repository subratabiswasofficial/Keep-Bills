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
import Logout from './pages/Logout';

import GlobalAlert from './alerts/GlobalAlert';
import Loading from './alerts/Loading';

import { loadUser } from './actions/auth';

/* this is mendatory */
if (localStorage.token) {
    store.dispatch(loadUser());
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    /* */

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <GlobalAlert />
                <Loading />

                {/* Private Route at React V6 */}
                <Routes>
                    {/* General */}
                    <Route path="/" element={<AuthProvider />} />

                    {/* student */}
                    <Route path="/profile" element={<PrivateRoute scope="student" />}>
                        <Route path="/profile" element={<StudentProfile />} />
                    </Route>

                    <Route path="/bills" element={<PrivateRoute scope="student" />}>
                        <Route path="/bills" element={<StudentBills />} />
                    </Route>

                    {/* admin */}
                    <Route path="/dashboard" element={<PrivateRoute scope="admin" />}>
                        <Route path="/dashboard" element={<Admin />} />
                    </Route>

                    {/* */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />

                    <Route path="/401" element={<Unauth />} />
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
