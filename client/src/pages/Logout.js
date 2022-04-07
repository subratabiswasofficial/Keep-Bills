import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { logout } from '../actions/auth';

const Logout = ({ is_authenticated, logout }) => {
    useEffect(() => {
        logout();
    }, []);

    if (is_authenticated) {
        return <Navigate to="/" />;
    }
    return <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
    is_authenticated: state.auth.is_authenticated
});
const mapDispatchAction = { logout };
export default connect(mapStateToProps, mapDispatchAction)(Logout);
