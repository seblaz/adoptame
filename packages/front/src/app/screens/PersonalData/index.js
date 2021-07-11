import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actionCreators from '~redux/User/actions';

import UserProfile from '../../components/UserProfile';

const PersonalData = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getMyData());
  }, [dispatch]);

  return <UserProfile user={me} me />;
};

export default PersonalData;
