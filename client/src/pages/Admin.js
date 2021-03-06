import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { validNumber, semesterView } from '../utils';
import { showBill, exitBill } from '../actions/billView';

import SearchIcon from '../images/bills/search.png';
import StudentIcon from '../images/dashboard/user.png';
import EnergyIcon from '../images/dashboard/plug.png';

const Admin = ({ view, showBill }) => {
    const [previewBillsHistory, setPreviewBillsHistory] = useState([]);
    const [billPage, setBillPage] = useState(true); // true if student bills, false if energy bills
    const [energyUsage, setEnergyUsage] = useState('VOID');
    /* exixting bills find */
    const retriveExistingBills = async () => {
        try {
            const response = await axios.get('/api/admin/bills');
            const bills = response.data;
            setPreviewBillsHistory(bills);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEnergyUsage = async () => {
        try {
            const response = await axios.get('/api/logger/data');
            const { usage } = response.data;
            setEnergyUsage(usage);
        } catch (error) {
            console.log(error);
        }
    };

    const [searchText, setSearchText] = useState('');

    const searchOnChangeHandler = (e) => {
        const text = e.target.value;
        if (!validNumber(text)) return;
        if (text.length > 12) return;
        setSearchText(text);
    };

    const onSearchHandler = async () => {
        if (searchText.length === 0) {
            await retriveExistingBills();
            return;
        }
        try {
            const body = {
                roll: Number(searchText)
            };
            const response = await axios.post('/api/admin/bills', body);
            const bills = response.data;
            setPreviewBillsHistory(bills);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (view) return;
        // if bill view is closed then it will work
        if (searchText.length > 0) {
            onSearchHandler();
        } else {
            retriveExistingBills();
        }
    }, [view]);

    useEffect(() => {
        if (billPage) return;
        fetchEnergyUsage();
    }, [billPage]);

    return (
        <section>
            <div className="banner">
                <div className="content">
                    <div className="table-frame">
                        <div className="page-nav">
                            <div className="progress-bar"></div>
                            <div
                                className={`bill-button big-button ${billPage ? 'active-big-button' : ''}`}
                                onClick={() => {
                                    setBillPage(true);
                                }}
                            >
                                <img src={StudentIcon} alt="Student Bill" />
                            </div>
                            <div
                                className={`energy-button big-button ${!billPage ? 'active-big-button' : ''}`}
                                onClick={() => {
                                    setBillPage(false);
                                }}
                            >
                                <img src={EnergyIcon} alt="Energy" />
                            </div>
                        </div>
                        {billPage && (
                            <>
                                <div className="table">
                                    <div className="search-bar">
                                        <div className="search-area">
                                            <input type="text" value="ROLL NUMBER" disabled />
                                            <input onChange={searchOnChangeHandler} value={searchText} type="text" placeholder="1810110XXXX" />
                                            <div onClick={onSearchHandler} className="search-button">
                                                <img src={SearchIcon} alt="Search" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-head">
                                        <p>Roll no.</p>
                                        <p>Amount</p>
                                        <p>Semester</p>
                                        <p>Document</p>
                                        <p>Action</p>
                                    </div>
                                    <div className="search-rows">
                                        {previewBillsHistory.map(({ amount, bid, created, department, ref, roll, screenshot, semester, status }) => (
                                            <div className={`data-row ${status}`} key={uuid()}>
                                                <p>{roll ? roll : 'void'}</p>
                                                <p>{amount}</p>
                                                <p>{semesterView(semester)}</p>
                                                <p className="screenshot">
                                                    <a href={screenshot}>Click to download</a>
                                                </p>
                                                <div className="action-cell">
                                                    {/* <ActionCell bid={bid} /> */}
                                                    <button
                                                        onClick={() => {
                                                            showBill({ scope: 'admin', amount, bid, created, department, ref, roll, screenshot, semester, status });
                                                        }}
                                                    >
                                                        Click to open
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {!billPage && (
                            <>
                                <div className="table-energy">
                                    <div className="table-head-energy">
                                        <p>Hostle no.</p>
                                        <p>Usage (Units)</p>
                                        <p>Status</p>
                                    </div>
                                    <div className="search-rows-energy">
                                        <div className={`data-row-energy`} key={uuid()}>
                                            <p>1st</p>
                                            <p>{energyUsage}</p>
                                            <p style={{ color: 'orangered', fontWeight: '600' }}>WARN</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
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
    showBill,
    exitBill
};

export default connect(mapStateToProps, mapDispatchAction)(Admin);
