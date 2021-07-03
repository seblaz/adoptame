import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import store from '~redux/store';

import Routes from './components/Routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4682b4'
    }
  }
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
