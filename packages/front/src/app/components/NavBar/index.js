import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTES } from '~constants/routes';
import actionCreators from '~redux/Auth/actions';

import Sidebar from '../Sidebar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    background: theme.background
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actionCreators.signOff());
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={() => setSidebarOpen(true)} onClose={() => setSidebarOpen(false)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Adoptame
          </Typography>
          <Link to={ROUTES.LOGIN} onClick={logout}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
      {sidebarOpen && <Sidebar open={sidebarOpen} />}
    </>
  );
}

export default NavBar;
