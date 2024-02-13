import React from 'react';

const Profile = () => {

  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Hello {storedUser?.firstName } {storedUser?.lastName }!</h1>
    </div>
  );
};

export default Profile;
