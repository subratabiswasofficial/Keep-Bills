import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ scope, user_type, is_authenticated }) => {
    if (scope === user_type && is_authenticated) return <Outlet />;
    return <Navigate to="/401" />;
};

/* Used states */
const mapStateToProps = (state) => ({
    user_type: state.auth.user_type,
    is_authenticated: state.auth.is_authenticated
});
/* used actions */
const mapDispatchAction = {};

export default connect(mapStateToProps, mapDispatchAction)(PrivateRoute);
