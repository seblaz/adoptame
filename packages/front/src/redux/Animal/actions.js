import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as AnimalService from '~services/AnimalService';
import { ROUTES } from '~constants/routes';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes(['CREATE_ANIMAL', 'GET_ANIMAL', 'GET_ANIMALS']), '@@ANIMAL');

export const actionCreators = {
  createAnimal: payload => ({
    type: actions.CREATE_ANIMAL,
    payload,
    target: TARGETS.ANIMAL,
    service: AnimalService.createAnimal,
    injections: [
      withPostSuccess((dispatch, { data: { id } }) => {
        dispatch(push(`${ROUTES.ANIMALS}/${id}`));
      })
    ]
  }),
  getAnimal: id => ({
    type: actions.GET_ANIMAL,
    target: TARGETS.ANIMAL,
    payload: id,
    service: AnimalService.getAnimal,
    injections: [
      withPostSuccess((dispatch, { data: animal }) => {
        dispatch(push(`${ROUTES.ANIMALS}/${animal.id}`));
      })
    ]
  }),
  getAnimals: () => ({
    type: actions.GET_ANIMALS,
    target: TARGETS.ANIMALS,
    service: AnimalService.getAnimals
  }),
  postulateForAdoption: ({ id, description }) => ({
    type: actions.ADOPT_ANIMAL,
    target: TARGETS.ANIMAL,
    payload: { id, description },
    service: AnimalService.postulateForAdoption,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.CREATE_ANIMAL));
      })
    ]
  })
};

export default actionCreators;
