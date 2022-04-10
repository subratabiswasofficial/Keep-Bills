import { SET_BILL, CLEAR_BILL, MARK_BILL } from '../actions/types';

const initialState = {
    scope: null,
    view: false,
    amount: null,
    bid: null,
    created: null,
    roll: null,
    department: null,
    semester: null,
    ref: null,
    location: null, // screenshot download link
    status: null
};

const billView = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BILL: {
            const { scope, amount, bid, created, department, ref, roll, screenshot, semester, status } = payload;
            return {
                ...initialState,
                view: true,
                scope,
                amount,
                bid,
                created,
                roll,
                department,
                semester,
                ref,
                location: screenshot,
                status
            };
        }
        case CLEAR_BILL:
            return {
                ...initialState,
                view: false
            };
        case MARK_BILL: {
            const { status } = payload;
            return {
                ...state,
                status
            };
        }
        default:
            return state;
    }
};

export default billView;
