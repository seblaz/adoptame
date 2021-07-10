import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~components/LoadingWrapper';
import AnimalCard from '~components/Animals/AnimalCard';

const MyAnimalsAdopted = () => {
  const dispatch = useDispatch();
  const { myAnimalsAdopted, myAnimalsAdoptedLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getMyAnimalsAdopted());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={myAnimalsAdoptedLoading}>
      <Typography variant="h4" component="h4">
        Mis mascotas adoptadas
      </Typography>
      <div className="row wrap">
        {myAnimalsAdopted && myAnimalsAdopted.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
      </div>
    </LoadingWrapper>
  );
};

export default MyAnimalsAdopted;
