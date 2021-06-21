import React from 'react';
import { bool, string, elementType } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { ROUTES } from '~constants/routes';

const AuthenticatedRoute = ({
  title,
  description,
  path,
  authenticated,
  isPublic,
  component: Component,
  ...props
}) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <Route path={path} {...props}>
      {isPublic || authenticated ? <Component /> : <Redirect to={ROUTES.LOGIN} />}
    </Route>
  </>
);

AuthenticatedRoute.propTypes = {
  path: string.isRequired,
  authenticated: bool,
  component: elementType,
  description: string,
  isPublic: bool,
  title: string
};

export default withRouter(AuthenticatedRoute);
