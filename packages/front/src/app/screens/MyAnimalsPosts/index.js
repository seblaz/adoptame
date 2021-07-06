import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~components/LoadingWrapper';
import AnimalCard from '~components/Animals/AnimalCard';

const AnimalsView = () => {
  const dispatch = useDispatch();
  const { myAnimals, myAnimalsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getMyAnimalsPosts());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={myAnimalsLoading}>
      <Typography variant="h4" component="h4">
        Mis mascotas en adopción
      </Typography>
      <div className="row wrap">
        {myAnimals && myAnimals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
      </div>
    </LoadingWrapper>
  );
};

export default AnimalsView;
