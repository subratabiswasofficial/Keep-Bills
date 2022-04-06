import React from 'react';
import ViewIcon from '../images/dashboard/001-preview.png';
import AcceptIcon from '../images/dashboard/003-check.png';
import DeclineIcon from '../images/dashboard/002-close.png';
import SearchIcon from '../images/bills/search.png';
import StudentIcon from '../images/dashboard/user.png';
import EnergyIcon from '../images/dashboard/plug.png';

const ActionCell = () => {
    return (
        <>
            <button>
                <img src={ViewIcon} alt="View" />
            </button>
            <button>
                <img src={AcceptIcon} alt="Accept" />
            </button>
            <button>
                <img src={DeclineIcon} alt="Decline" />
            </button>
        </>
    );
};

const Admin = () => {
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
                                    <input type="text" placeholder="1810110XXXX" />
                                    <div className="search-button">
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
                                <div className="data-row">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                                <div className="data-row">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                                <div className="data-row">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                                <div className="data-row">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                                <div className="data-row">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                                <div className="data-row approved">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                                <div className="data-row declined">
                                    <p>18101105046</p>
                                    <p>12000</p>
                                    <p>6</p>
                                    <p className="screenshot">secreenshot.jpg</p>
                                    <div className="action-cell">
                                        <ActionCell />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admin;
