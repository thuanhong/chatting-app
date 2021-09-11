import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  static displayName = 'ErrorBoundary';

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      if (this.state.error.name === 'InvalidTokenError') {
        return <Redirect to='/' />;
      }
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
