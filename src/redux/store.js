import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/root-reducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const middleWares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const appStore = createStore(rootReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(appStore);

export default appStore;
