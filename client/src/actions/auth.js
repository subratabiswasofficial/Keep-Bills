import { AUTH_ERROR, LOGIN_SUCCESS, OTP_MISMATCHED, OTP_SENT, USER_LOADED, USER_LOGOUT } from './types';
import axios from 'axios';

export const loadUser = () => (dispatch) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    if (token === null || type == null) {
        dispatch({
            type: AUTH_ERROR
        });
    }
    dispatch({
        type: USER_LOADED,
        payload: { token, type }
    });
};

export const loadUserAndNavigate = (navigate) => (dispatch) => {
    dispatch(loadUser());
    // navigate('/');
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
        /* SLOW ALERT */
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
        /* slow alert */
    }
};

/* might be async later */
export const logout = () => async (dispatch) => {
    localStorage.clear();
    dispatch({
        type: USER_LOGOUT
    });
};
