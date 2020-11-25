import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/root-reducer';
import { persistStore } from 'redux-persist';

const middleWares = [logger];

const appStore = createStore(rootReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(appStore);

export default appStore;
