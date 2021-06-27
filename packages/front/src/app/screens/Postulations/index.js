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

  /**
    {
        "animalId": "60d898cc79cd2a009c25a693",
        "description": "soy re capa",
        "userId": "60d897da79cd2a009c25a68e",
        "createdAt": "2021-06-27T15:38:45.317Z",
        "updatedAt": "2021-06-27T15:38:45.317Z",
        "__v": 0,
        "user": {
            "_id": "60d897da79cd2a009c25a68e",
            "email": "test@test.com",
            "password": "$2a$10$D2gwpTmiYigXt40WCKrrD.EdKpiJ.fGtFxfNFejfSDtNyhnP8PFUS",
            "role": "user",
            "createdAt": "2021-06-27T15:23:06.488Z",
            "updatedAt": "2021-06-27T15:23:06.488Z",
            "__v": 0
        }
    }
   */
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
