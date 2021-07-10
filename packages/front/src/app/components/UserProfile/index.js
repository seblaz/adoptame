import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';
import AnimalCard from '~components/Animals/AnimalCard';
import { ROUTES } from '~constants/routes';

import { INFO_FIELDS } from './constants';
import styles from './styles.module.scss';

const UserProfile = ({ loading, user, me }) => {
  const dispatch = useDispatch();
  const { animals, animalsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimals(true));
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
          <h1 className="title bold m-bottom-4">Perfil de usuario</h1>
          <div className="row">
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
            <Grid item xs={8}>
              <div className={`row wrap ${styles.scroll}`}>
                {ownAnimals && ownAnimals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
              </div>
            </Grid>
          </div>
        </LoadingWrapper>
      </Container>
    </div>
  );
};

export default UserProfile;
