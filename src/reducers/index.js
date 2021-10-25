import {combineReducers} from "redux";
import { createMultilanguageReducer} from 'redux-multilanguage';
import UserReducer from './userReducer';
import ConfigReducer from './configReducer';

export default combineReducers({
    multilanguage: createMultilanguageReducer({currentLanguageCode: "en"}),
    userReducer: UserReducer,
    configReducer: ConfigReducer
})