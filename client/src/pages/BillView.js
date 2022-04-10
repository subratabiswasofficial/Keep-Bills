import React from 'react';
import { connect } from 'react-redux';

import CloseIcon from '../images/alert/close.png';

import { exitBill, markBill } from '../actions/billView';
import { semesterView } from '../utils';
import axios from 'axios';

const BillView = ({ view, scope, bid, roll, department, created, amount, semester, ref_id, location, status, exitBill, markBill }) => {
    const onCloseHandler = () => {
        exitBill();
    };
    const onOkHandler = () => {
        exitBill();
    };
    const onDeleteHandler = async () => {
        try {
            await axios.delete(`/api/bill/${bid}`);
            exitBill();
        } catch (error) {
            console.log(error);
        }
    };

    const markHandler = (status) => () => {
        markBill(bid, status);
    };

    return (
        view && (
            <div className="bill-view-frame">
                <div className="bill-view-window">
                    <div className="bill-view-base bill-view-header">
                        <button onClick={onCloseHandler}>
                            <img src={CloseIcon} alt="Close" />
                        </button>
                    </div>
                    <div className="bill-view-base">
                        <div className="bill-view-table">
                            {scope === 'admin' && (
                                <div className="bill-view-row">
                                    <p>Roll</p>
                                    <p>{`${roll}`}</p>
                                </div>
                            )}
                            {scope === 'admin' && (
                                <div className="bill-view-row">
                                    <p>Department</p>
                                    <p>{`${department}`}</p>
                                </div>
                            )}
                            <div className="bill-view-row">
                                <p>Uploaded at</p>
                                <p>{`${created.split('T')[0]},  ${created.split('T')[1].slice(0, 8)}`}</p>
                            </div>
                            <div className="bill-view-row">
                                <p>Amount</p>
                                <p>₹ {`${amount}`}</p>
                            </div>
                            <div className="bill-view-row">
                                <p>Semester</p>
                                <p>{`${semesterView(semester)}`}</p>
                            </div>
                            <div className="bill-view-row">
                                <p>Transaction Id</p>
                                <p>{`${ref_id}`}</p>
                            </div>
                            <div className="bill-view-row">
                                <p>Screenshot</p>
                                <p className="screenshot">
                                    <a href={location}>Click to download</a>
                                </p>
                            </div>
                            <div className="bill-view-row">
                                <p>Status</p>
                                <p>{`${status[0].toUpperCase()}${status.slice(1)}`}</p>
                            </div>
                        </div>
                    </div>
                    {scope === 'admin' ? (
                        <div className="bill-view-base bill-view-button">
                            <button onClick={markHandler('pending')}>REVIEW</button>
                            <button onClick={markHandler('approved')}>APPROVE</button>
                            <button onClick={markHandler('declined')}>DECLINE</button>
                        </div>
                    ) : scope === 'student' ? (
                        <div className="bill-view-base bill-view-button">
                            <button onClick={onOkHandler}>OK</button>
                            <button onClick={onDeleteHandler}>DELETE</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    );
};

const mapStateToProp = (state) => ({
    view: state.billView.view,
    scope: state.billView.scope,
    /* */
    amount: state.billView.amount,
    bid: state.billView.bid,
    created: state.billView.created,
    roll: state.billView.roll,
    department: state.billView.department,
    semester: state.billView.semester,
    ref_id: state.billView.ref, // dosent work with ref
    location: state.billView.location,
    status: state.billView.status
});

const mapDispatchAction = {
    exitBill,
    markBill
};

export default connect(mapStateToProp, mapDispatchAction)(BillView);
