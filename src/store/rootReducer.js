import { combineReducers } from 'redux';

import currentChange from './modules/Navbar/reducer';
import user from './modules/User/reducer';
const rootReducer = combineReducers({
    currentChange,
    user
});
export default rootReducer;