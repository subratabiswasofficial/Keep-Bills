import { SHOW_LOADING, HIDE_LOADING } from '../actions/types';

const initialState = {
    is_loading: false,
    title: null,
    message: null
};

const loading = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_LOADING:
            const { title, message } = payload;
            return {
                ...initialState,
                is_loading: true,
                title,
                message
            };
        case HIDE_LOADING:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default loading;
