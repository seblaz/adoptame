import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/order
import { makeStyles } from '@material-ui/core/styles';

// Material UI components
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ROUTES } from '~constants/routes';
import { capitalize } from '~utils/string';

import { ESPECIES_POR_GENERO } from '../constants';

import styles from './styles.module.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 200
  },
  media: {
    height: 140
  }
});

const AnimalsView = ({ animal }) => {
  const classes = useStyles();

  return (
    <Link className={styles.container} to={ROUTES.ANIMAL_VIEW.replace(':id', animal.id)}>
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
              <b>Especie:</b> {ESPECIES_POR_GENERO[animal.especie][animal.sexo]}
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
  );
};

AnimalsView.propTypes = {
  animal: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default AnimalsView;
