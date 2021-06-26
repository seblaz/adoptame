import React, { Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import Home from '~screens/Home';
import Login from '~screens/Login';
import Animal from '~screens/Animal';
import Playground from '~screens/Playground';
import Registration from '~screens/Registration';
import AnimalView from '~screens/AnimalView';
import PersonalData from '~screens/PersonalData';
import { history } from '~redux/store';
import { ROUTES } from '~constants/routes';

import styles from './styles.module.scss';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const AppRoutesContainer = () => (
  <ConnectedRouter history={history}>
    <div className={`column center ${styles.container} ${styles.containerAlgo}`}>
      <Suspense>
        <AuthenticatedRoute path={ROUTES.REGISTRATION} component={Registration} isPublic exact />
        <AuthenticatedRoute path={ROUTES.LOGIN} component={Login} isPublic exact />
        <AuthenticatedRoute path={ROUTES.CREATE_ANIMAL} component={Animal} exact />
        <AuthenticatedRoute path={ROUTES.ANIMAL_VIEW} component={AnimalView} exact />
        <AuthenticatedRoute path={ROUTES.HOME} component={Home} exact />
        <AuthenticatedRoute path={ROUTES.PERSONAL_DATA} component={PersonalData} exact />
        {process.env.NODE_ENV === 'development' && <Route path={ROUTES.PLAYGROUND} component={Playground} />}
      </Suspense>
    </div>
  </ConnectedRouter>
);

export default AppRoutesContainer;
