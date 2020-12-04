import styled, {css} from 'styled-components'
import { Link } from 'react-router-dom';

const navigationMenuStyles = css`
      padding-right: 2rem;
      font-size: 1.2rem;
      cursor: pointer;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
  position: relative;
`

export const LogoContainer = styled(Link)`
    width: 5rem;
    height: 100%;
`

export const NavLinkContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    margin: auto 0;
`

export const NavigationMenuLink = styled(Link)`
${navigationMenuStyles}
`

export const NavigationMenuDiv = styled.div`
${navigationMenuStyles}
`