import React, { useState, useMemo } from 'react'
import App from 'next/app'
import Header from '../components/Header'

import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from '../components/GlobalStyles/GlobalStyles'

import theme from '../theme/theme.js'
import UserContextProvider from '../context/UserContext'
import { render } from 'react-dom'
import Axios from 'axios'
const { API_URL } = process.env

class MyApp extends App {

  render(){
  const { Component, pageProps } = this.props;
  return (
    <> 
      <UserContextProvider>
        <ThemeProvider theme = {theme}>
          <GlobalStyles />
          {/* <Header isDark />  */}
          <Header /> 
          <Component {...pageProps} />
        </ThemeProvider>
      </UserContextProvider>
    </>
  );
  }
}

export default MyApp