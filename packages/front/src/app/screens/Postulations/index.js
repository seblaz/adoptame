import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';

const Postulations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postulations, postulationsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getPostulationsForAnimal(id));
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={postulationsLoading}>
      {postulations &&
        postulations.map(postulation => (
          <div key={postulation.userId}>
            <div className="column full-width">
              <h1 className="title bold">${postulation.userId}Postulaciones de la mascota</h1>
            </div>
          </div>
        ))}
    </LoadingWrapper>
  );
};

export default Postulations;
