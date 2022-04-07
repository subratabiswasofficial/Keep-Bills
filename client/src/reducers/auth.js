import { LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR } from '../actions/types';

const initialState = {};

const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_ERROR:
            console.log(payload);
            return {
                ...state
            };

        default:
            return state;
    }
};

export default auth;
