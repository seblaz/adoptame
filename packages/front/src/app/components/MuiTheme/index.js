import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4682b4'
    }
  }
});

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
