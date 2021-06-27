import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { TARGETS } from './constants';

const initialState = {
  onInitialLoad: true,
  [TARGETS.ANIMAL]: null,
  [TARGETS.POSTULATIONS]: null
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.CREATE_ANIMAL, actions.GET_ANIMAL, actions.GET_POSTULATIONS]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
