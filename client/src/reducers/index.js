import { combineReducers } from 'redux';

import auth from './auth';
import alert from './alert';
import loading from './loading';
import billView from './billView';

export default combineReducers({
    auth,
    alert,
    loading,
    billView
});
