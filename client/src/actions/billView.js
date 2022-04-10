import { SET_BILL, CLEAR_BILL, MARK_BILL } from '../actions/types';
import axios from 'axios';

export const showBill =
    (params = {}) =>
    (dispatch) => {
        dispatch({
            type: SET_BILL,
            payload: params
        });
    };

export const exitBill = () => (dispatch) => {
    dispatch({
        type: CLEAR_BILL
    });
};

export const markBill = (bid, status) => async (dispatch) => {
    try {
        const body = {
            bid,
            status
        };
        await axios.post('/api/admin/markbill', body);
    } catch (error) {
        console.log(error);
    }
    dispatch({
        type: MARK_BILL,
        payload: {
            status
        }
    });
};
