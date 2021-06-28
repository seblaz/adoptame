import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as MyDataService from '~services/MyDataService';
import { ROUTES } from '~constants/routes';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes(['GET_MY_DATA', 'UPDATE_MY_DATA', 'GET_USER']), '@@ANIMAL');

export const actionCreators = {
  getMyData: () => ({
    type: actions.GET_MY_DATA,
    target: TARGETS.ME,
    service: MyDataService.getMyData
  }),
  getUser: id => ({
    type: actions.GET_USER,
    payload: id,
    target: TARGETS.USER_PROFILE,
    service: MyDataService.getUser
  }),
  updateMyData: payload => ({
    type: actions.UPDATE_MY_DATA,
    payload,
    target: TARGETS.ME,
    service: MyDataService.updateMyData,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.PERSONAL_DATA));
      })
    ]
  })
};

export default actionCreators;