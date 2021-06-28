import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router';

import actionCreators from '~redux/User/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';

import { INFO_FIELDS } from './constants';
import styles from './styles.module.scss';

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userProfile, userProfileLoading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(actionCreators.getUser(id));
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={userProfileLoading}>
      <Card className={styles.root}>
        <CardContent>
          {userProfile &&
            INFO_FIELDS.map(field => (
              <>
                <Typography variant={field.variant} color="textSecondary" component="p" key={field.key}>
                  <b>{field.label ? field.label : '-'}</b> {userProfile[field.key]}
                </Typography>
              </>
            ))}
        </CardContent>
      </Card>
    </LoadingWrapper>
  );
};

export default UserProfile;
