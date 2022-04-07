import React from 'react';
import RainIcon from '../images/errors/rain.png';

const NotFound = () => {
    return (
        <section>
            <div className="banner">
                <div className="content">
                    <div className="error-page-frame">
                        <div className="error-content-area">
                            <img src={RainIcon} alt="404" />
                            <p>404</p>
                        </div>
                    </div>
                    <div className="error-page-bottom">
                        <p>Page not found</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
