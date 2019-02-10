import home from '../home-reducer/index';
import details from '../details-reducer/index';
import user from '../user-reducer/index';
import {combineReducers} from 'redux';
const reducer=combineReducers({
    home,
    details,
    user
});
export default reducer;