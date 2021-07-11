import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Container, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';
import AnimalCard from '~components/Animals/AnimalCard';
import { ROUTES } from '~constants/routes';

import { INFO_FIELDS } from './constants';
import styles from './styles.module.scss';

const UserProfile = ({ loading, user, me }) => {
  const dispatch = useDispatch();
  const { animals, animalsLoading, myAnimalsAdopted } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimals(false));
    dispatch(AnimalActions.getMyAnimalsAdopted());
  }, [dispatch]);

  const classes = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(2),
      color: '#FFFFF'
    },
    centerItems: {
      display: 'flex',
      justifyContent: 'center'
    },
    centerVertically: {
      display: 'flex',
      alignItems: 'center'
    },
    filtro: {
      paddingTop: theme.spacing(4),
      width: '100%'
    }
  }))();

  const ownAnimals = animals?.filter(animal => animal.userId === user?.id);
  const isLoading = loading || animalsLoading;
  return (
    <div className={`full-width full-height ${styles.animalsContainer}`}>
      <Container className={classes.root}>
        <LoadingWrapper loading={isLoading}>
          <div className="row full-width m-right-2">
            <div className="column">
              <h1 className="title bold m-bottom-4">Perfil de usuario</h1>
              <div className={styles.box}>
                <Card className={styles.root}>
                  <CardContent>
                    {user &&
                      INFO_FIELDS.map(field => (
                        <>
                          <Typography
                            variant={field.variant}
                            color="textSecondary"
                            component="p"
                            key={field.key}>
                            <b>{field.label ? field.label : '-'}</b> {user?.[field.key]}
                          </Typography>
                        </>
                      ))}
                    {me && (
                      <div className="row full width">
                        <Link to={ROUTES.PERSONAL_DATA_EDIT} className="m-top-6 m-right-4">
                          Editar
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="column full-width">
              <div>
                {!!ownAnimals?.length && (
                  <h4 className="large-text bold m-bottom-2 m-left-4 m-top-4">Mis mascotas rescatadas</h4>
                )}
                <div className={`row wrap full-width ${styles.scroll}`}>
                  {ownAnimals && ownAnimals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
                </div>
              </div>
              <div>
                {!!myAnimalsAdopted?.length && (
                  <h4 className="large-text bold m-bottom-2 m-left-4 m-top-4">Mis mascotas adoptadas</h4>
                )}
                <div className={`row wrap full-width ${styles.scroll}`}>
                  {myAnimalsAdopted &&
                    myAnimalsAdopted.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
                </div>
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </Container>
    </div>
  );
};

export default UserProfile;
