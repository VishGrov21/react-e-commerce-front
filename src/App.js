import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUpPage from './pages/signInAndSignUpPage/SignInAndSignUpPage';
import Header from './components/header/Header.component';
import { connect } from 'react-redux';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
import { checkUserSession } from './redux/actions/userActions';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/sign-in'
          render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)}
        />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
