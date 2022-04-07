import { OTP_SENT, AUTH_ERROR, LOGIN_SUCCESS, OTP_MISMATCHED, USER_LOADED, USER_LOGOUT } from '../actions/types';

const initialState = {
    otp_sent: false,
    user_type: null,
    user_email: null,
    user_token: null,
    is_authenticated: false
};

const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case OTP_SENT:
            return {
                ...state,
                otp_sent: true
            };
        case LOGIN_SUCCESS:
            const { email } = payload;
            return {
                ...state,
                user_email: email,
                is_authenticated: true
            };
        case USER_LOGOUT:
        case AUTH_ERROR:
        case OTP_MISMATCHED:
            return {
                ...initialState
            };
        case USER_LOADED:
            const { token, type } = payload;
            return {
                ...state,
                user_type: type,
                user_token: token,
                is_authenticated: true
            };
        default:
            return state;
    }
};

export default auth;
