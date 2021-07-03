import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/order
import { makeStyles } from '@material-ui/core/styles';

// Material UI components
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import { ROUTES } from '~constants/routes';
import { capitalize } from '~utils/string';

import styles from './styles.module.scss';
import { ESPECIES } from './constants';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 200
  },
  media: {
    height: 140
  }
});

const AnimalsView = () => {
  const dispatch = useDispatch();
  const { animals, animalsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimals());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <LoadingWrapper loading={animalsLoading}>
      <div className={`full-width full-height ${styles.animalsContainer}`}>
        <h1 className="title bold m-bottom-4">Mascotas en adopción</h1>
        <div className={styles.box}>
          <div className="row wrap">
            {animals &&
              animals.map(animal => (
                <Link
                  key={animal.id}
                  className={styles.container}
                  to={ROUTES.ANIMAL_VIEW.replace(':id', animal.id)}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="https://thumbs.dreamstime.com/b/happy-golden-retriever-puppy-week-old-runs-toward-camera-96711049.jpg"
                        title="{animal.nombre}"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {animal.nombre}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                          <b>Especie:</b> {ESPECIES[animal.especie][animal.sexo]}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                          <b>Sexo:</b> {capitalize(animal.sexo)}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                          <b>Edad:</b> {animal.edad} años
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default AnimalsView;
