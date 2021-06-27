import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/order
import { makeStyles } from '@material-ui/core/styles';

// Material UI components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';

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
      <h1 className="title bold">Ver Mascotas</h1>
      {animals &&
        animals.map(animal => (
          <div key={animal.id}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://thumbs.dreamstime.com/b/happy-golden-retriever-puppy-week-old-runs-toward-camera-96711049.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {animal.nombre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {animal.especie}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {animal.sexo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {animal.edad} años
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
    </LoadingWrapper>
  );
};

export default AnimalsView;
