import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as AnimalService from '~services/AnimalService';
import { ROUTES } from '~constants/routes';

export const actions = createTypes(completeTypes(['CREATE_ANIMAL', 'GET_ANIMAL']), '@@ANIMAL');

export const actionCreators = {
  createAnimal: payload => ({
    type: actions.CREATE_ANIMAL,
    payload,
    service: AnimalService.createAnimal,
    injections: [
      withPostSuccess((dispatch, { data: { id } }) => {
        dispatch(push(`${ROUTES.ANIMALS}/${id}`));
      })
    ]
  }),
  getAnimal: id => ({
    type: actions.CREATE_ANIMAL,
    payload: id,
    service: AnimalService.getAnimal,
    injections: [
      withPostSuccess((dispatch, { data: animal }) => {
        dispatch(push(`${ROUTES.ANIMALS}/${animal.id}`));
      })
    ]
  })
};

export default actionCreators;
