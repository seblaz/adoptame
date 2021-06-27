import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';

import styles from './styles.module.scss';

const Postulations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postulations, postulationsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getPostulationsForAnimal(id));
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={postulationsLoading}>
      <h1 className="title bold">Postulaciones de la mascota</h1>
      {postulations &&
        postulations.map(postulation => (
          <div className={styles.container} key={postulation.userId}>
            <h2>User name:</h2>
            <span className="column full-width">{postulation.description}</span>
          </div>
        ))}
    </LoadingWrapper>
  );
};

export default Postulations;
