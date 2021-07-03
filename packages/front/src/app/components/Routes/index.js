import React, { Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '~screens/Home';
import Login from '~screens/Login';
import CreateAnimal from '~screens/CreateAnimal';
import Playground from '~screens/Playground';
import Registration from '~screens/Registration';
import AnimalView from '~screens/AnimalView';
import AnimalsView from '~screens/AnimalsView';
import PersonalData from '~screens/PersonalData';
import PersonalDataEdit from '~screens/PersonalDataEdit';
import MyAnimalPosts from '~screens/MyAnimalsPosts';
import { history } from '~redux/store';
import { ROUTES } from '~constants/routes';
import UserProfile from '~app/screens/UserProfile';
import NavBar from '~app/components/NavBar';

import styles from './styles.module.scss';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const AppRoutesContainer = () => {
  const { user } = useSelector(state => state.auth);
  const isAuth = Boolean(user?.token);
  return (
    <ConnectedRouter history={history}>
      <div className={`column center ${styles.container} ${styles.containerAlgo}`}>
        {isAuth && <NavBar />}
        <Suspense>
          <AuthenticatedRoute path={ROUTES.REGISTRATION} component={Registration} isPublic exact />
          <AuthenticatedRoute path={ROUTES.LOGIN} component={Login} isPublic exact />
          <AuthenticatedRoute path={ROUTES.CREATE_ANIMAL} component={CreateAnimal} exact />
          <AuthenticatedRoute path={ROUTES.ANIMAL_VIEW} component={AnimalView} exact />
          <AuthenticatedRoute path={ROUTES.HOME} component={Home} exact />
          <AuthenticatedRoute path={ROUTES.PERSONAL_DATA} component={PersonalData} exact />
          <AuthenticatedRoute path={ROUTES.USER_PROFILE} component={UserProfile} exact />
          <AuthenticatedRoute path={ROUTES.ANIMALS} component={AnimalsView} exact />
          <AuthenticatedRoute path={ROUTES.PERSONAL_DATA_EDIT} component={PersonalDataEdit} exact />
          <AuthenticatedRoute path={ROUTES.MY_ANIMALS_POSTS} component={MyAnimalPosts} exact />
          {process.env.NODE_ENV === 'development' && (
            <Route path={ROUTES.PLAYGROUND} component={Playground} />
          )}
        </Suspense>
      </div>
    </ConnectedRouter>
  );
};

export default AppRoutesContainer;
