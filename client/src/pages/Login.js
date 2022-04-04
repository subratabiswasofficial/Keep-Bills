import React, { useState } from 'react';
import axios from 'axios';

import email from '../images/email.png';
import password from '../images/password.png';
import loading from '../images/loading2.png';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        otp: ''
    });
    const [varifyOtp, setVarifyOtp] = useState(false);

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

    const otoRequestHandler = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email: loginForm.email });
        try {
            const res = await axios.post('/api/login-request-otp', body, config);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const otpVarifyHandler = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email: loginForm.email, otp: Number(loginForm.otp) });
        try {
            console.log(body);
            const res = await axios.post('/api/login-varify-otp', body, config);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendOtpHandler = () => {
        setVarifyOtp(!varifyOtp);
        console.log('send OTP');
        otoRequestHandler();
    };
    const varifyOtpHandler = () => {
        if (loginForm.otp.length !== 6) {
            return;
        }
        setVarifyOtp(!varifyOtp);
        console.log('varify OTP');
        otpVarifyHandler();
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
                                        <input name="email" className="email" type="text" placeholder="Enter Email" value={loginForm.email} onChange={formOnChangeHandler} />
                                    </div>
                                    <div className="field">
                                        <img src={password} alt="otp icon" />
                                        <input name="otp" className="otp" type="text" placeholder="Enter 6 digit OTP" value={loginForm.otp} onChange={formOnChangeHandler} disabled={!varifyOtp} />
                                    </div>
                                </div>
                                <div className="submit-area">
                                    {varifyOtp ? (
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

export default Login;
