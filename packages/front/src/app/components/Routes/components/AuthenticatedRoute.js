import React from 'react';
import { bool, string, elementType } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import NavBar from '~app/components/NavBar';
import { ROUTES } from '~constants/routes';

const AuthenticatedRoute = ({ title, description, path, isPublic, component: Component, ...props }) => {
  const { user } = useSelector(state => state.auth);
  const isAuth = Boolean(user?.token);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Route path={path} {...props}>
        {isAuth && path !== ROUTES.LOGIN && <NavBar />}
        {isPublic || isAuth ? <Component /> : <Redirect to={ROUTES.LOGIN} />}
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
