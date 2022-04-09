import { SHOW_LOADING, HIDE_LOADING } from './types';

export const showLoading =
    (title, message = '') =>
    (dispatch) => {
        dispatch({
            type: SHOW_LOADING,
            payload: { title, message }
        });
    };
export const hideLoading =
    (title, message = '') =>
    (dispatch) => {
        dispatch({
            type: HIDE_LOADING
        });
    };
