import styled, { css } from 'styled-components'

const baseButtonStyles = css`
  background-color: black;
  color: white;

   &:hover {
    background-color: white;
    color: black;
    border: 3px dashed darkturquoise;
    transition: all 300ms ease-in-out;
  }
  `

const googleSignInStyle = css`
    background-color: #4285f4;
    color: white;

    &:hover {
      background-color: white;
      color: black;
      border: 3px dashed black;
    }
`

const lightBackgroundStyle = css`
    background-color: #fff;
    color: #000;
    border: 1px solid black;

    &:hover {
      background-color: #000;
      color: #fff;
      border: none;
    }
`

const getButtonStyleBasedOnType = (props) => {
    
    if (props.isGoogleSignIn) {
        return googleSignInStyle;
    }

    return props.inverted ? lightBackgroundStyle : baseButtonStyles;
}


export const CustomButtonStyles = styled.button`
  width: auto;
  min-width: 165px;
  height: 50px;
  cursor: pointer;
  border: none;
  font-family: 'Satisfy';
  font-size: 1.2rem;
  letter-spacing: 1px;
  padding: 0 1rem;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${getButtonStyleBasedOnType}
`