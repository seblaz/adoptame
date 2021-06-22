import React, { Suspense, useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import Home from '~screens/Home';
import Login from '~screens/Login';
import Animal from '~screens/Animal';
import Playground from '~screens/Playground';
import Registration from '~screens/Registration';
import AnimalView from '~screens/AnimalView';
import { history } from '~redux/store';
import { ROUTES } from '~constants/routes';
import LocalStorageService from '~services/LocalStorageService';

import styles from './styles.module.scss';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const AppRoutesContainer = () => {
  const [token, setToken] = useState();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const t = LocalStorageService.getSessionToken();
    setToken(t);
    setFetched(true);
  }, [setToken, setFetched]);
  const authorized = !fetched || token;
  return (
    <ConnectedRouter history={history}>
      <div className={`column center ${styles.container} ${styles.containerAlgo}`}>
        <Suspense>
          <AuthenticatedRoute
            path={ROUTES.REGISTRATION}
            component={Registration}
            isPublic
            exact
            authenticated={authorized}
          />
          <AuthenticatedRoute
            path={ROUTES.LOGIN}
            component={Login}
            isPublic
            exact
            authenticated={authorized}
          />
          <AuthenticatedRoute
            path={ROUTES.CREATE_ANIMAL}
            component={Animal}
            exact
            authenticated={authorized}
          />
          <AuthenticatedRoute
            path={ROUTES.ANIMAL_VIEW}
            component={AnimalView}
            exact
            authenticated={authorized}
          />
          <AuthenticatedRoute path={ROUTES.HOME} component={Home} exact authenticated={authorized} />
          {process.env.NODE_ENV === 'development' && (
            <Route path={ROUTES.PLAYGROUND} component={Playground} />
          )}
        </Suspense>
      </div>
    </ConnectedRouter>
  );
};

export default AppRoutesContainer;
