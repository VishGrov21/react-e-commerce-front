import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      {/* If you are using react, wrap your root component with PersistGate. 
      This delays the rendering of your app's UI until your persisted state 
      has been retrieved and saved to redux. NOTE the PersistGate loading 
      prop can be null, or any react instance, e.g. loading={<Loading />}*/}

      {/* The persist gate would not only receive the store values but also 
      rehydrate the state whenever our application refreshes */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
