import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import LocalStorageService from '~services/LocalStorageService';

import { actions } from './actions';
import { TARGETS } from './constants';

const initialState = {
  onInitialLoad: true,
  [TARGETS.USER]: { token: LocalStorageService.getSessionToken() }
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.SIGN_IN]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
