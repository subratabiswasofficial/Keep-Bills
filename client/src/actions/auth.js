import { AUTH_ERROR } from './types';

export const testReducer = (line) => (dispatch) => {
    dispatch({
        type: AUTH_ERROR,
        payload: line
    });
};
