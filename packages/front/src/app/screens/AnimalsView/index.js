import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';

const AnimalsView = () => {
  const dispatch = useDispatch();
  const { animals, animalsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimals());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={animalsLoading}>
      <h1 className="title bold">Ver Mascotas</h1>
      {animals &&
        animals.map(animal => (
          <div key={animal.id}>
            <span> {animal.nombre}</span>
          </div>
        ))}
    </LoadingWrapper>
  );
};

export default AnimalsView;
