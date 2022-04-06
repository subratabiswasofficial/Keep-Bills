import React, { useState } from 'react';
import UploadIcon from '../images/bills/cloud-computing.png';
import HistoryIcon from '../images/bills/invoice.png';
import SearchIcon from '../images/bills/search.png';

const StudentBills = () => {
    const [openForm, setOpenForm] = useState(true);
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
                        {!openForm ? (
                            <div className="table">
                                <div className="search-bar">
                                    <div className="search-area">
                                        <input type="text" value="DATE" disabled />
                                        <input type="text" placeholder="03-03-2022, 30-03-2020" />
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
                                    <p>Status</p>
                                </div>
                                <div className="search-rows">
                                    <div className="data-row">
                                        <p>04-03-2020</p>
                                        <p>12000</p>
                                        <p>6</p>
                                        <p className="screenshot">secreenshot.jpg</p>
                                        <p className="accepted">Accepted</p>
                                    </div>
                                    <div className="data-row">
                                        <p>05-03-2020</p>
                                        <p>12000</p>
                                        <p>6</p>
                                        <p className="screenshot">secreenshot.jpg</p>
                                        <p className="rejected">Rejected</p>
                                    </div>
                                    <div className="data-row">
                                        <p>06-03-2020</p>
                                        <p>12000</p>
                                        <p>6</p>
                                        <p className="screenshot">secreenshot.jpg</p>
                                        <p className="pending">Pending</p>
                                    </div>
                                    <div className="data-row">
                                        <p>07-03-2020</p>
                                        <p>12000</p>
                                        <p>6</p>
                                        <p className="screenshot">secreenshot.jpg</p>
                                        <p className="pending">Pending</p>
                                    </div>
                                    <div className="data-row">
                                        <p>08-03-2020</p>
                                        <p>12000</p>
                                        <p>6</p>
                                        <p className="screenshot">secreenshot.jpg</p>
                                        <p className="rejected">Rejected</p>
                                    </div>
                                    <div className="data-row">
                                        <p>09-03-2020</p>
                                        <p>12000</p>
                                        <p>6</p>
                                        <p className="screenshot">secreenshot.jpg</p>
                                        <p className="accepted">Accepted</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        {openForm ? (
                            <div className="form-holder">
                                <div className="form-frame">
                                    <div className="bill-form-field">
                                        <p className="bill-form-heading">Upload Bill</p>
                                    </div>
                                    <div className="bill-form-field">
                                        <p className="label">Semester:</p>
                                        <input type="text" placeholder="Semester" name="semester" />
                                    </div>
                                    <div className="bill-form-field">
                                        <p className="label">Amount:</p>
                                        <input type="text" placeholder="Semester" name="semester" />
                                    </div>
                                    <div className="bill-form-field">
                                        <p className="label">Transaction ref no:</p>
                                        <input type="text" placeholder="Semester" name="semester" />
                                    </div>
                                    <div className="bill-form-field">
                                        <p className="label">Screenshot:</p>
                                        <span className="file-upload-button">
                                            <p className="internal-labal">Choose File</p>
                                            <input type="file" style={{ opacity: 0 }} placeholder="Semester" name="semester" />
                                            <p className="external-labal">Upload</p>
                                        </span>
                                    </div>
                                    <div className="bill-form-submit">
                                        <button>CONFIRM</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentBills;
