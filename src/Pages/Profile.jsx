import React from 'react';

const Profile = () => {

  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Hello {storedUser?.firstName } {storedUser?.lastName }!</h1>
      <div className='userInfo'>
      <h2>MES ADRESSES</h2>
      <h3>{!storedUser?.address?'No addresses were saved yet':storedUser?.address}</h3>
      </div>
    </div>
  );
};

export default Profile;
