import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalCard from '~app/components/Animals/AnimalCard';

const AnimalsView = () => {
  const dispatch = useDispatch();
  const { animals, animalsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimals());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={animalsLoading}>
      <Typography variant="h4" component="h4">
        Mascotas en adopción
      </Typography>
      <div className="row wrap">
        {animals && animals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
      </div>
    </LoadingWrapper>
  );
};

export default AnimalsView;
