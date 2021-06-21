import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import LoadingWrapper from '~app/components/LoadingWrapper';
import actionCreators from '~redux/Animal/actions';

const AnimalView = () => {
  const { id } = useParams();
  const { animal, animalLoading } = useSelector(state => state.animals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getAnimal(id));
  });

  return (
    <LoadingWrapper loading={animalLoading}>
      <div className="column center middle">
        <h1 className="title bold">Animal</h1>
        <div>Nombre: {animal.nombre}</div>
        <div>Especie: {animal.especie}</div>
        <div>Sexo: {animal.sexo}</div>
        <div>Edad: {animal.edad}</div>
        <div>Tamaño: {animal.tamanio}</div>
      </div>
    </LoadingWrapper>
  );
};

export default AnimalView;
