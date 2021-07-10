import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { TARGETS } from './constants';

const initialState = {
  onInitialLoad: true,
  [TARGETS.ANIMAL]: null,
  [TARGETS.ANIMALS]: null,
  [TARGETS.POSTULATIONS]: [],
  [TARGETS.MY_ANIMALS]: null,
  [TARGETS.MY_ANIMALS_ADOPTED]: []
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [
    actions.CREATE_ANIMAL,
    actions.GET_ANIMAL,
    actions.GET_ANIMALS,
    actions.GET_POSTULATIONS,
    actions.GET_MY_ANIMALS_ADOPTED
  ]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
