import { HIDE_ALERT, SHOW_ALERT } from './types';
import { hideLoading } from './loading';

export const exitAlert = () => (dispatch) => {
    dispatch({
        type: HIDE_ALERT
    });
};

export const alert =
    (alertType, alertTitle, alertMessage, alertTimeout = 5000) =>
    (dispatch) => {
        dispatch(hideLoading());
        dispatch({
            type: SHOW_ALERT,
            payload: {
                type: alertType,
                title: alertTitle,
                message: alertMessage,
                timeout: alertTimeout
            }
        });
        /* clear all existing timeouts */
        // ref https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals
        // Get a reference to the last interval + 1
        const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
        // Clear any timeout/interval up to that id
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
        /* */
        setTimeout(() => {
            dispatch(exitAlert());
        }, alertTimeout);
    };
