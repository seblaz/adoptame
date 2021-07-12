import React from 'react';
import { bool, string, elementType } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import NavBar from '~app/components/NavBar';
import { ROUTES } from '~constants/routes';

import styles from './styles.module.scss';

const AuthenticatedRoute = ({ title, description, path, isPublic, component: Component, ...props }) => {
  const { user } = useSelector(state => state.auth);
  const isAuth = Boolean(user?.token);
  const showNavbar = isAuth && path !== ROUTES.LOGIN && path !== ROUTES.REGISTRATION;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Route path={path} {...props}>
        {showNavbar && <NavBar />}
        <div className={`${styles.mainContent} ${showNavbar ? styles.padded : ''}`}>
          {isPublic || isAuth ? <Component /> : <Redirect to={ROUTES.LOGIN} />}
        </div>
      </Route>
    </>
  );
};

AuthenticatedRoute.propTypes = {
  path: string.isRequired,
  authenticated: bool,
  component: elementType,
  description: string,
  isPublic: bool,
  title: string
};

export default withRouter(AuthenticatedRoute);
