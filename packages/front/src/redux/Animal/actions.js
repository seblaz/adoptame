import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as AnimalService from '~services/AnimalService';
import { ROUTES } from '~constants/routes';

export const actions = createTypes(completeTypes(['ANIMAL']), '@@ANIMAL');

export const actionCreators = {
  createAnimal: payload => ({
    type: actions.LOGIN,
    payload,
    service: AnimalService.createAnimal,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.HOME));
      })
    ]
  })
};

export default actionCreators;
