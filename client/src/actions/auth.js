import { AUTH_ERROR, LOGIN_SUCCESS, OTP_MISMATCHED, OTP_SENT, USER_LOADED, USER_LOGOUT } from './types';
import axios from 'axios';
import { alert } from './alert';

export const loadUser = () => (dispatch) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    if (token === null || type == null) {
        axios.defaults.headers.common['x-auth-token'] = null; // default auth header
        dispatch({
            type: AUTH_ERROR
        });
    } else {
        axios.defaults.headers.common['x-auth-token'] = token;
        dispatch({
            type: USER_LOADED,
            payload: { token, type }
        });
    }
};

export const sendOtp = (email) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email });
    try {
        const res = await axios.post('/api/login-request-otp', body, config);
        console.log(res.data);
        dispatch({
            type: OTP_SENT
        });
    } catch (err) {
        console.log(err);
        dispatch(alert('warn', 'Wait !', 'Please reacharge your wifi', 10000));
    }
};

export const varifyOtpAndNavigate = (email, otp, navigate) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, otp: Number(otp) });
    try {
        const res = await axios.post('/api/login-varify-otp', body, config);
        const { type, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('type', type);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { email }
        });
        dispatch(loadUser());
        navigate('/');
    } catch (err) {
        dispatch({
            type: OTP_MISMATCHED
        });
        console.log(err);
        dispatch(alert('error', 'Oops !', 'Wrong OTP. Please try Again', 10000));
    }
};

/* might be async later */
export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({
        type: USER_LOGOUT
    });
};
