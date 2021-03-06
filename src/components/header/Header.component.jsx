import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/images/crown.svg';
import CartDropdown from '../shopping-cart/CartDropdown';
import ShoppingCart from '../shopping-cart/ShoppingCart';
import { selectCurrentUser } from '../../redux/selectors/userSelector';
import {
  HeaderContainer,
  LogoContainer,
  NavigationMenuDiv,
  NavigationMenuLink,
  NavLinkContainer,
} from './Header.styles';
import { signOutStart } from './../../redux/actions/userActions';

const Header = ({ currentUser, handleCartDisplay, signOut }) => {
  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <NavLinkContainer>
        <NavigationMenuLink to='/shop'>Shop</NavigationMenuLink>
        <NavigationMenuLink to='/contact'>Contact</NavigationMenuLink>
        {currentUser !== null ? (
          <NavigationMenuDiv onClick={signOut}>Sign Out</NavigationMenuDiv>
        ) : (
          <NavigationMenuLink to='/sign-in'>Sign In</NavigationMenuLink>
        )}
        <ShoppingCart
          onClick={() => {
            this.props.handleCartDisplay();
          }}
        />
      </NavLinkContainer>
      <CartDropdown />
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
