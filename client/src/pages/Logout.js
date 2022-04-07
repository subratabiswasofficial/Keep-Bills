import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { logout } from '../actions/auth';

const Logout = ({ logout }) => {
    logout();
    return <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(Logout);
