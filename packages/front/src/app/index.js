import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import store from '~redux/store';

import Routes from './components/Routes';

const theme = createMuiTheme({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
      <ToastContainer />
    </Provider>
  </MuiThemeProvider>
);

export default hot(App);
