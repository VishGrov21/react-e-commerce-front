import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUpPage from './pages/signInAndSignUpPage/SignInAndSignUpPage';
import Header from './components/header/Header.component';
import { auth, createUser } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/actions/userActions';
import CheckoutPage from './pages/checkoutPage/CheckoutPage';
// import { selectShopCollectionsForPreview } from './redux/selectors/shopDataSelector';

class App extends Component {
  unSubscribeFromAuth = null;

  componentDidMount() {
    const { setUser,} = this.props;
    // onAuthStateChanged method is an open subscription between our app and firebase
    // Whenever any changes occur on firebase or our app from any source related to this app
    // Firebase sends a msg that auth state has changed
    // Whether they signed-in through some service like Google Sign In
    // Or using email and password
    // This connection is always open as long as this component is mounted on the dom.
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUser(userAuth);
        userRef.onSnapshot((snapshot) => {
          // the id of the user is obtained from snapshot.id
          // Other data such as name and email are available on the data() method of snapshot
          setUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      // During Sign Out the userAuth object would be null so if condition above fails
      // So we are setting the currentUser to null.
      setUser({ currentUser: userAuth });
    });
    // In the below three lines I have added the code that would add the shopdata in the firestore.
    // addCollectionAndDocuments(
    //   'shopData',
    //   colectionsArray.map(({ title, items }) => ({ title, items })),
    // );
  }

  componentWillUnmount() {
    // This method has to be executed to close the open subscription
    // between the app and firebase.
    this.unSubscribeFromAuth();
  }

  render() {
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
            render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  // colectionsArray: selectShopCollectionsForPreview(state),
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
