import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import { ROUTES } from '~constants/routes';

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Adoptame
          </Typography>
          <Link to={ROUTES.LOGIN}>
            <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
