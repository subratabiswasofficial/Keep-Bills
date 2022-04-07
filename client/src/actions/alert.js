import { HIDE_ALERT, SHOW_ALERT } from './types';

export const exitAlert = () => (dispatch) => {
    dispatch({
        type: HIDE_ALERT
    });
};

export const alert = (alertType, alertTitle, alertMessage, alertTimeout) => (dispatch) => {
    dispatch({
        type: SHOW_ALERT,
        payload: {
            type: alertType,
            title: alertTitle,
            message: alertMessage,
            timeout: alertTimeout
        }
    });
    setTimeout(() => {
        dispatch(exitAlert());
    }, alertTimeout);
};
