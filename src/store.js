import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ["configReducer"]
}

const psReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(psReducer);

export const persistor = persistStore(store)
export default store;