import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import directoryReducer from './directoryReducer';
import shopDataReducer from './shopDataReducer';
import { persistReducer } from 'redux-persist';
// This is local storage for session storage import is different
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shopData: shopDataReducer,
});

export default persistReducer(persistConfig, rootReducer);
