import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ["configReducer"]
}

const psReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(psReducer, applyMiddleware(thunk));

export const persistor = persistStore(store)
export default store;