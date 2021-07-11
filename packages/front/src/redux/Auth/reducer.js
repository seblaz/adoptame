import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import LocalStorageService from '~services/LocalStorageService';
import { setAuthHeader } from '~config/api';

import { actions } from './actions';
import { TARGETS } from './constants';

const token = LocalStorageService.getSessionToken();

const initialState = {
  onInitialLoad: true,
  [TARGETS.USER]: { token }
};

// There is probably a better place to do this
setAuthHeader(token);

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.SIGN_IN, actions.SIGN_OFF, actions.REGISTER]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
