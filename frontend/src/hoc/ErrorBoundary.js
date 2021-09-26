import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    return (
      <div className='error-boundary'>
        {this.props.children}
        <ToastContainer />
      </div>
    );
  }
}

export default ErrorBoundary;
