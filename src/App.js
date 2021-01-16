import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header.component';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/actions/userActions';
import Spinner from './components/spinner/Spinner.component';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.component';
import './App.css';

const HomepageLazy = lazy(() => import('./pages/homepage/Homepage'));
const ShoppageLazy = lazy(() => import('./pages/shop/ShopPage'));
const CheckoutPageLazy = lazy(() => import('./pages/checkoutPage/CheckoutPage'));
const SignInAndSignUpPageLazy = lazy(() =>
  import('./pages/signInAndSignUpPage/SignInAndSignUpPage'),
);

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomepageLazy} />
            <Route path='/shop' component={ShoppageLazy} />
            <Route exact path='/checkout' component={CheckoutPageLazy} />
            <Route
              exact
              path='/sign-in'
              render={() => (currentUser ? <Redirect to='/' /> : <SignInAndSignUpPageLazy />)}
            />
          </Suspense>
        </ErrorBoundary>
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
