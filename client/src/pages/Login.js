import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import email from '../images/login/email.png';
import password from '../images/login/password.png';
import loading from '../images/login/loading2.png';

import { sendOtp, varifyOtpAndNavigate } from '../actions/auth';

const Login = ({ otp_sent, sendOtp, varifyOtpAndNavigate }) => {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        otp: ''
    });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const validNumber = (code = '') => {
        for (let i = 0; i < code.length; ++i) {
            if ('0' <= code[i] && code[i] <= '9') {
                continue;
            } else {
                return false;
            }
        }
        return true;
    };

    const formOnChangeHandler = (e) => {
        if (e.target.name === 'otp') {
            if (!validNumber(e.target.value)) {
                return;
            }
        }
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const sendOtpHandler = () => {
        if (validateEmail(loginForm.email) === null) return;
        sendOtp(loginForm.email);
    };

    const varifyOtpHandler = () => {
        if (loginForm.otp.length !== 6) return;
        varifyOtpAndNavigate(loginForm.email, loginForm.otp, navigate);
    };

    return (
        <>
            <section>
                <div className="banner">
                    <div className="content">
                        <div className="frame">
                            <div className="caption">
                                <p className="cp-1">Keep track</p>
                                <p className="cp-2">Bills</p>
                            </div>
                            <div className="login-card">
                                <div className="level">
                                    <p>LOGIN</p>
                                </div>
                                <div className="form-area">
                                    <div className="field">
                                        <img src={email} alt="email icon" />
                                        <input name="email" type="text" placeholder="Enter Email" value={loginForm.email} onChange={formOnChangeHandler} disabled={otp_sent} />
                                    </div>
                                    <div className="field">
                                        <img src={password} alt="otp icon" />
                                        <input
                                            name="otp"
                                            className={`${!otp_sent ? 'disabled-input' : ''}`}
                                            type="text"
                                            placeholder="Enter 6 digit OTP"
                                            value={loginForm.otp}
                                            onChange={formOnChangeHandler}
                                            disabled={!otp_sent}
                                        />
                                    </div>
                                </div>
                                <div className="submit-area">
                                    {otp_sent ? (
                                        <div className="submit-button">
                                            {/* <img alt="varify icon" /> */}
                                            <button onClick={varifyOtpHandler}>VARIFY OTP</button>
                                        </div>
                                    ) : (
                                        <div className="submit-button">
                                            <img src={loading} alt="loading icon" />
                                            <button onClick={sendOtpHandler}>SEND OTP</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

/* Used states */
const mapStateToProps = (state) => ({
    otp_sent: state.auth.otp_sent
});
/* used actions */
const mapDispatchAction = {
    sendOtp,
    varifyOtpAndNavigate
};

export default connect(mapStateToProps, mapDispatchAction)(Login);
