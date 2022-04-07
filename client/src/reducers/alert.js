import { SHOW_ALERT, HIDE_ALERT } from '../actions/types';

const initialState = {
    type: null,
    title: null,
    message: null,
    timeout: null
};

const alert = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_ALERT:
            return {
                ...state,
                ...payload
            };
        case HIDE_ALERT:
            return {
                ...initialState
            };
        default:
            return state;
    }
};
export default alert;
