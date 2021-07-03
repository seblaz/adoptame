import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from '~redux/store';

import MuiTheme from './components/MuiTheme';
import Routes from './components/Routes';

const App = () => (
  <Provider store={store}>
    <MuiTheme>
      <Routes />
      <ToastContainer />
    </MuiTheme>
  </Provider>
);

export default hot(App);
