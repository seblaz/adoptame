import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import * as UserService from '~services/AuthService';
import LocalStorageService from '~services/LocalStorageService';
import { ROUTES } from '~constants/routes';
import { setAuthHeader } from '~config/api';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes(['SIGN_IN', 'SIGN_OFF', 'REGISTER']), '@@AUTH');

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
        setAuthHeader(token);
        dispatch(push(ROUTES.ANIMALS));
      }),
      withPostFailure(() => {
        toast.error('Credenciales inválidas');
      })
    ]
  }),
  signOff: () => {
    LocalStorageService.removeSessionToken();
    return {
      type: actions.SIGN_OFF,
      target: TARGETS.USER,
      payload: {}
    };
  },
  register: ({ email, password }) => ({
    type: actions.REGISTER,
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
