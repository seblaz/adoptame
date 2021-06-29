import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { TARGETS } from './constants';

const initialState = {
  onInitialLoad: true,
  [TARGETS.USER]: null,
  [TARGETS.USER_PROFILE]: null
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.GET_MY_DATA, actions.GET_USER]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
