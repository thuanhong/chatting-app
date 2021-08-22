import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@src/core';
import './styles.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
export default MyApp;
