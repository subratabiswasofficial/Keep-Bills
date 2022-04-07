import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import { Navigate } from 'react-router';

const AuthProvider = ({ is_authenticated, user_type }) => {
    if (is_authenticated && user_type === 'student') {
        return <Navigate to="/profile" />;
    } else if (is_authenticated && user_type === 'admin') {
        return <Navigate to="/dashboard" />;
    } else {
        return <Navigate to="/login" />;
    }
};

/* Used states */
const mapStateToProps = (state) => ({
    user_type: state.auth.user_type,
    is_authenticated: state.auth.is_authenticated
});
/* used actions */
const mapDispatchAction = { loadUser };

export default connect(mapStateToProps, mapDispatchAction)(AuthProvider);
