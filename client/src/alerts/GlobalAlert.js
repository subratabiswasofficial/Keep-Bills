import React, { useState } from 'react';
import CloseIcon from '../images/alert/close.png';
import SuccessIcon from '../images/alert/checked.png';
import ErrorIcon from '../images/alert/cancel.png';

const GlobalAlert = ({ active, status }) => {
    const [open, setOpen] = useState(active);
    const statusIcon = {
        success: SuccessIcon,
        error: ErrorIcon
    };
    return open ? (
        <div class="alert-frame">
            <div class="alert-window">
                <div class="alert-base alert-header">
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <img src={CloseIcon} alt="Close" />
                    </button>
                </div>
                <div class="alert-base alert-logo">
                    <img src={statusIcon[status]} alt="Success Icon" />
                </div>
                <div class="alert-base alert-title">
                    <p>Viola !</p>
                </div>
                <div class="alert-base alert-desc">
                    <p>Waoow Nice Wonder full</p>
                </div>
                <div class="alert-base alert-button">
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default GlobalAlert;
