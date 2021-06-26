import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as MyDataService from '~services/MyDataService';
import { ROUTES } from '~constants/routes';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes(['GET_MY_DATA']), '@@ANIMAL');

export const actionCreators = {
  getMyData: () => ({
    type: actions.GET_MY_DATA,
    target: TARGETS.ME,
    service: MyDataService.getMyData,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.PERSONAL_DATA));
      })
    ]
  })
};

export default actionCreators;
