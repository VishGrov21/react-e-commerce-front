import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/images/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartDropdown from '../shopping-cart/CartDropdown';
import ShoppingCart from '../shopping-cart/ShoppingCart';
import { selectCurrentUser } from '../../redux/selectors/userSelector';
import './header.scss';

const Header = ({ currentUser, handleCartDisplay }) => {
  return (
    <div className='header-container'>
      <Link to='/' className='logoContainer'>
        <Logo className='logo' />
      </Link>
      <div className='nav-link-container'>
        <Link to='/shop' className='navigationMenu'>
          Shop
        </Link>
        <Link to='/contact' className='navigationMenu'>
          Contact
        </Link>
        {currentUser !== null ? (
          <div className='navigationMenu' onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link to='/sign-in' className='navigationMenu'>
            Sign In
          </Link>
        )}
        <ShoppingCart
          onClick={() => {
            console.log('testing');
            this.props.handleCartDisplay();
          }}
        />
      </div>
      <CartDropdown />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
