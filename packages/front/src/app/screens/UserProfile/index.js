import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import actionCreators from '~redux/User/actions';
import UserProfile from '~components/UserProfile';

const UserProfileScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userProfile, userProfileLoading } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(actionCreators.getUser(id));
  }, [dispatch, id]);
  return <UserProfile user={userProfile} loading={userProfileLoading} />;
};

export default UserProfileScreen;
