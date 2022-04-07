import React from 'react';
import { connect } from 'react-redux';

import CloseIcon from '../images/alert/close.png';
import SuccessIcon from '../images/alert/checked.png';
import ErrorIcon from '../images/alert/cancel.png';
import WarnIcon from '../images/alert/warn.png';

import { exitAlert } from '../actions/alert';

const iconType = {
    success: SuccessIcon,
    error: ErrorIcon,
    warn: WarnIcon
};

const GlobalAlert = ({ type, title, message, exitAlert }) => {
    const onCloseHandler = () => {
        exitAlert();
    };
    const onOkHandler = () => {
        exitAlert();
    };
    return (
        type && (
            <div className="alert-frame">
                <div className="alert-window">
                    <div className="alert-base alert-header">
                        <button onClick={onCloseHandler}>
                            <img src={CloseIcon} alt="Close" />
                        </button>
                    </div>
                    <div className="alert-base alert-logo">
                        <img src={iconType[type]} alt="Success Icon" />
                    </div>
                    <div className="alert-base alert-title">
                        <p>{title}</p>
                    </div>
                    <div className="alert-base alert-desc">
                        <p>{message}</p>
                    </div>
                    <div className="alert-base alert-button">
                        <button onClick={onOkHandler}>OK</button>
                    </div>
                </div>
            </div>
        )
    );
};

const mapStateToProp = (state) => ({
    type: state.alert.type,
    title: state.alert.title,
    message: state.alert.message
});
const mapDispatchAction = {
    exitAlert
};

export default connect(mapStateToProp, mapDispatchAction)(GlobalAlert);
