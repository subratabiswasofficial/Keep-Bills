import React from 'react';
import { connect } from 'react-redux';

import LoadingIcon from '../images/alert/penguin.gif';

const Loading = ({ is_loading, title, message }) => {
    return (
        is_loading && (
            <div className="alert-frame">
                <div className="alert-window">
                    <div className="alert-base alert-logo">
                        <img src={LoadingIcon} alt="Success Icon" />
                    </div>
                    <div className="alert-base alert-title">
                        <p>{title}</p>
                    </div>
                    <div className="alert-base alert-desc">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    );
};

const mapStateToProp = (state) => ({
    is_loading: state.loading.is_loading,
    title: state.loading.title,
    message: state.loading.message
});
const mapDispatchAction = {};

export default connect(mapStateToProp, mapDispatchAction)(Loading);
