import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/root-reducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
// import { fetchProductsDataStart } from './sagas/shop.sagas';
import rootsaga from './sagas/root.sagas';

const sagaMiddleware = createSagaMiddleware();

// The middlewares variable will take an array of middlewares
const middleWares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const appStore = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleware.run(rootsaga);

export const persistor = persistStore(appStore);

export default appStore;
