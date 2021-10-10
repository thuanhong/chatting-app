import React from 'react';
import ProfilePage from '@src/components/profile-page/ProfilePage';
import { withAuth } from '@src/hoc/withAuth';

const ProfileScreen = () => {
  return <ProfilePage />;
};

export default withAuth(ProfileScreen);
