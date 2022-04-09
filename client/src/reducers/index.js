import { combineReducers } from 'redux';

import auth from './auth';
import alert from './alert';
import loading from './loading';

export default combineReducers({
    auth,
    alert,
    loading
});
