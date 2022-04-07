import React from 'react';
import LockIcon from '../images/errors/padlock.png';

const Unauth = () => {
    return (
        <section>
            <div className="banner">
                <div className="content">
                    <div className="error-page-frame">
                        <div className="error-content-area">
                            <img src={LockIcon} alt="" />
                            <p>401</p>
                        </div>
                    </div>
                    <div className="error-page-bottom">
                        <p>Access Denied</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Unauth;
