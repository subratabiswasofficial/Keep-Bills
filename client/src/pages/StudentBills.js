import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';

import UploadIcon from '../images/bills/cloud-computing.png';
import HistoryIcon from '../images/bills/invoice.png';
import SearchIcon from '../images/bills/search.png';

import { validNumber } from '../utils';
import { alert } from '../actions/alert';
import { showLoading, hideLoading } from '../actions/loading';
import { showBill } from '../actions/billView';

const BillHistory = ({ view, showBill }) => {
    const [billsHistory, setBillsHistory] = useState([]);
    const [previewBillsHistory, setPreviewBillsHistory] = useState([]);

    /* exixting bills find */
    const retriveExistingBills = async () => {
        try {
            const response = await axios.get('/api/bill');
            const bills = response.data;
            setBillsHistory(bills);
            setPreviewBillsHistory(bills);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (view) return;
        // if bill view is closed then it will work
        retriveExistingBills();
    }, [view]);

    const [searchText, setSearchText] = useState('');

    const searchOnChangeHandler = (e) => {
        const text = e.target.value;
        if (!validNumber(text)) return;
        if (text.length > 1) return;
        setSearchText(text);
        if (text.length === 1) setPreviewBillsHistory(billsHistory.filter(({ semester }) => semester === Number(text)));
        if (text.length === 0) setPreviewBillsHistory(billsHistory);
    };

    return (
        <div className="table">
            <div className="search-bar">
                <div className="search-area">
                    <input type="text" value="SEMESTER" disabled />
                    <input onChange={searchOnChangeHandler} value={searchText} type="text" placeholder="Eg. 3" />
                    <div className="search-button">
                        <img src={SearchIcon} alt="Search Button" />
                    </div>
                </div>
            </div>
            <div className="table-head">
                <p>Date</p>
                <p>Amount</p>
                <p>Semester</p>
                <p>Document</p>
                <p>Action</p>
            </div>
            <div className="search-rows">
                {previewBillsHistory.map(({ bid, amount, semester, ref, screenshot, created, status }) => (
                    <div className={`data-row ${status}`} key={uuid()}>
                        <p>{created.split('T')[0]}</p>
                        <p>{amount}</p>
                        <p>{semester}</p>
                        <p className="screenshot">
                            <a href={screenshot}>Click to download</a>
                        </p>
                        {/* <p>{`${status[0].toUpperCase()}${status.slice(1)}`}</p> */}
                        <div className="action-cell">
                            {/* <ActionCell bid={bid} /> */}
                            <button
                                onClick={() => {
                                    showBill({ scope: 'student', bid, amount, semester, ref, screenshot, created, status });
                                }}
                            >
                                Click to open
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BillForm = ({ alert, showLoading, hideLoading }) => {
    const [billForm, setBillForm] = useState({
        amount: '',
        semester: '',
        ref: '',
        status: ''
    });

    const [screenshotFile, setScreenshotFile] = useState(null);
    const [screenshotFileName, setScreenshotFileName] = useState(null);

    const fileOnChangeHandler = (e) => {
        setScreenshotFile(e.target.files[0]);
        const fileName = e.target.files[0].name.split('.')[0];
        const fileExt = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
        const previewFileName = `${fileName.slice(0, 15)}${fileName.length > 15 ? '..' : ''}.${fileExt}`;
        setScreenshotFileName(previewFileName);
    };

    const textOnChangeHandler = (e) => {
        /* only number input */
        if (e.target.name === 'amount') {
            if (!validNumber(e.target.value)) {
                return;
            }
        }
        if (e.target.name === 'semester') {
            if (!validNumber(e.target.value)) {
                return;
            }
            if (e.target.value.length > 1) return;
        }

        setBillForm({
            ...billForm,
            [e.target.name]: e.target.value
        });
    };

    const formSubmitRequest = async (formData) => {
        try {
            showLoading('Loading...', 'Please wait');
            const body = formData;
            await axios.post('/api/bill', body, {
                headers: {
                    'Content-Type': 'multipart/formdata'
                }
            });
            setBillForm({
                amount: '',
                semester: '',
                ref: '',
                status: ''
            });
            setScreenshotFile(null);
            setScreenshotFileName(null);
            alert('success', 'Noice !', 'Your bill is uploaded.', 5000);
        } catch (error) {
            console.log(error);
            alert('error', 'Oops !', 'Something went wrong', 5000);
        } finally {
            hideLoading();
        }
    };

    const formSubmitHandler = () => {
        /* varify */
        /* */
        const formData = new FormData();
        formData.append('amount', billForm.amount);
        formData.append('semester', billForm.semester);
        formData.append('ref', billForm.ref);
        formData.append('screenshot', screenshotFile);
        formSubmitRequest(formData);
    };

    return (
        <div className="form-holder">
            <div className="form-frame">
                <div className="bill-form-field">
                    <p className="bill-form-heading">Upload Bill</p>
                </div>
                <div className="bill-form-field">
                    <p className="label">Semester:</p>
                    <input onChange={textOnChangeHandler} value={billForm.semester} type="text" placeholder="Eg. 3" name="semester" />
                </div>
                <div className="bill-form-field">
                    <p className="label">Amount:</p>
                    <input onChange={textOnChangeHandler} value={billForm.amount} type="text" placeholder="Eg. 10000" name="amount" />
                </div>
                <div className="bill-form-field">
                    <p className="label">Transaction ref no:</p>
                    <input onChange={textOnChangeHandler} value={billForm.ref} type="text" placeholder="Eg. UPI ID 123XXX" name="ref" />
                </div>
                <div className="bill-form-field">
                    <p className="label">Screenshot:</p>
                    <span className="file-upload-button">
                        <p className="internal-labal">{screenshotFileName ? screenshotFileName : 'Choose File'}</p>
                        <input onChange={fileOnChangeHandler} type="file" style={{ opacity: 0 }} placeholder="Semester" name="semester" />
                        <p className="external-labal">Upload</p>
                    </span>
                </div>
                <div className="bill-form-submit">
                    <button onClick={formSubmitHandler}>CONFIRM</button>
                </div>
            </div>
        </div>
    );
};

const StudentBills = ({ view, alert, showLoading, hideLoading, showBill }) => {
    const [openForm, setOpenForm] = useState(false);
    return (
        <section>
            <div className="banner">
                <div className="content">
                    <div className="table-frame">
                        <div className="page-nav">
                            <div className="progress-bar"></div>
                            <div
                                className={`bill-button big-button ${openForm ? 'active-big-button' : ''}`}
                                onClick={() => {
                                    setOpenForm(true);
                                }}
                            >
                                <img src={UploadIcon} alt="Upload" />
                            </div>
                            <div
                                className={`bill-button big-button ${!openForm ? 'active-big-button' : ''}`}
                                onClick={() => {
                                    setOpenForm(false);
                                }}
                            >
                                <img src={HistoryIcon} alt="History" />
                            </div>
                        </div>
                        {openForm ? <BillForm alert={alert} showLoading={showLoading} hideLoading={hideLoading} /> : <BillHistory view={view} showBill={showBill} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* Used states */
const mapStateToProps = (state) => ({
    view: state.billView.view
});
/* used actions */
const mapDispatchAction = {
    alert,
    showLoading,
    hideLoading,
    /* */
    showBill
};

export default connect(mapStateToProps, mapDispatchAction)(StudentBills);
