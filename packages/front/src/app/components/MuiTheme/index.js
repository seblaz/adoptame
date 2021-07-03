import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  status: {
    danger: orange[500]
  }
});

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
