import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';

const Postulations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animal, animalLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={animalLoading}>
      {animal && (
        <>
          <div className="column full-width">
            <h1 className="title bold">Postulaciones de la mascota</h1>
          </div>
        </>
      )}
    </LoadingWrapper>
  );
};

export default Postulations;
