import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalCard from '~app/components/Animals/AnimalCard';

import styles from './styles.module.scss';

const AnimalsView = () => {
  const dispatch = useDispatch();
  const { animals, animalsLoading } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch(AnimalActions.getAnimals());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={animalsLoading}>
      <div className={`full-width full-height ${styles.animalsContainer}`}>
        <h1 className="title bold m-bottom-4">Mascotas en adopción</h1>
        <div className={styles.box}>
          <div className="row wrap">
            {animals && animals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default AnimalsView;
