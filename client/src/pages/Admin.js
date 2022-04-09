import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import ViewIcon from '../images/dashboard/001-preview.png';
import AcceptIcon from '../images/dashboard/003-check.png';
import DeclineIcon from '../images/dashboard/002-close.png';
import SearchIcon from '../images/bills/search.png';
import StudentIcon from '../images/dashboard/user.png';
import EnergyIcon from '../images/dashboard/plug.png';

import { validNumber } from '../utils';

const Admin = () => {
    const [previewBillsHistory, setPreviewBillsHistory] = useState([]);

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

    useEffect(() => {
        retriveExistingBills();
    }, []);

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

    const ActionCell = ({ bid: bidKey }) => {
        const markStatusHandler = (status) => async () => {
            setPreviewBillsHistory(
                previewBillsHistory.map((item) => {
                    if (bidKey === item.bid) {
                        return {
                            ...item,
                            status
                        };
                    } else {
                        return item;
                    }
                })
            );
            try {
                const body = {
                    bid: bidKey,
                    status
                };
                await axios.post('/api/admin/markbill', body);
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <>
                <button>
                    <img src={ViewIcon} onClick={markStatusHandler('pending')} alt="View" />
                </button>
                <button>
                    <img src={AcceptIcon} onClick={markStatusHandler('approved')} alt="Accept" />
                </button>
                <button>
                    <img src={DeclineIcon} onClick={markStatusHandler('declined')} alt="Decline" />
                </button>
            </>
        );
    };

    return (
        <section>
            <div className="banner">
                <div className="content">
                    <div className="table-frame">
                        <div className="page-nav">
                            <div className="progress-bar"></div>
                            <div className="bill-button big-button active-big-button">
                                <img src={StudentIcon} alt="Student Bill" />
                            </div>
                            <div className="energy-button big-button">
                                <img src={EnergyIcon} alt="Energy" />
                            </div>
                        </div>
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
                                {previewBillsHistory.map(({ bid, screenshot, semester, amount, status, roll }) => (
                                    <div className={`data-row ${status}`} key={uuid()}>
                                        <p>{roll ? roll : 'void'}</p>
                                        <p>{amount}</p>
                                        <p>{semester}</p>
                                        <p className="screenshot">
                                            <a href={screenshot}>Click to download</a>
                                        </p>
                                        <div className="action-cell">
                                            <ActionCell bid={bid} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admin;
