import { Component, ErrorInfo } from 'react';
import { Redirect } from 'react-router-dom';
import { ELSCommonUIConstants } from '@els/els-ui-common-react';
import { ELSIcon } from 'components/common/els';
import { Box } from 'components/common';

class ErrorBoundary extends Component {
  static displayName = 'ErrorBoundary';

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.error) {
      if (this.state.error.name === 'InvalidTokenError') {
        return <Redirect to={`/${ELSCommonUIConstants.security.States.NotAuthorized}`} />;
      }
      return (
        <Box p3 className="u-els-text-center">
          <div>
            <ELSIcon name="alert-unexpected-error" size="4x" />
          </div>
          <h2>Oops, something went wrong.</h2>
          <div>
            <a href="/">Go Home</a>
          </div>
          <details className="u-els-text-left" style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
