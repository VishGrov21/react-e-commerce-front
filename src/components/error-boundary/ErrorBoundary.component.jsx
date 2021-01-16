import React, { Component } from 'react';
import { ErrorImageText, ErrorImageContainer, ErrorImageOverlay } from './error-boundary.styles';

class ErrorBoundary extends Component {
  state = {
    hasErrorOccured: false,
  };
  static getDerivedStateFromError = (err) => ({ hasErrorOccured: true });

  componentDidCatch = (error, info) => {
    console.log(error);
  };
  render() {
    if (this.state.hasErrorOccured) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/g3hgqe8.png' />
          <ErrorImageText>
            A broken clock is right twice a day. But if you just have one clock, it’s impossible to
            tell exactly when the clock is right. So it could be right at any moment. And that
            brings you to the crux of the conceptualization. What is time? Nothing but an abyss.
            Clocks are just false attempts to harness its power. It’s cruel really.
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
