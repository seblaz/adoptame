import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as UserService from '~services/AuthService';
import LocalStorageService from '~services/LocalStorageService';
import { ROUTES } from '~constants/routes';
import { setAuthHeaders } from '~config/api';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes(['SIGN_IN']), '@@AUTH');

export const actionCreators = {
  signIn: ({ email, password }) => ({
    type: actions.SIGN_IN,
    target: TARGETS.USER,
    payload: { email, password },
    service: UserService.signIn,
    injections: [
      withPostSuccess((dispatch, response) => {
        // TODO: Persist token into api header and save user into state.
        const { token } = response.data;
        LocalStorageService.setSessionToken(token);
        setAuthHeaders(token);
        dispatch(push(ROUTES.CREATE_ANIMAL));
      })
    ]
  }),

  register: ({ email, password }) => ({
    type: actions.LOGIN,
    target: TARGETS.USER,
    payload: { email, password },
    service: UserService.register,
    injections: [
      withPostSuccess(dispatch => {
        // TODO: Persist token into api header and save user into state.
        dispatch(push(ROUTES.LOGIN));
      })
    ]
  })
};

export default actionCreators;
