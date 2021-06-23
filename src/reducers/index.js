import {combineReducers} from "redux";
import { createMultilanguageReducer} from 'redux-multilanguage';
import UserReducer from './UserReducer';
import ConfigReducer from './ConfigReducer';

export default combineReducers({
    multilanguage: createMultilanguageReducer({currentLanguageCode: "en"}),
    userReducer: UserReducer,
    configReducer: ConfigReducer
})