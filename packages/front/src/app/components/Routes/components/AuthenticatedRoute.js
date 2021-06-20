import React from 'react';
import { bool, string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { ROUTES } from '~constants/routes';

const AuthenticatedRoute = ({ title, description, path, authenticated, isPublic, ...props }) =>
  isPublic || authenticated ? (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Route path={path} {...props} />
    </>
  ) : (
    <Redirect path={ROUTES.LOGIN} />
  );

AuthenticatedRoute.propTypes = {
  path: string.isRequired,
  authenticated: bool,
  description: string,
  isPublic: bool,
  title: string
};

export default withRouter(AuthenticatedRoute);
