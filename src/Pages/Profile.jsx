import React from 'react';

const Profile = () => {

  // Use useEffect to store user data in localStorage on component mount
 

  // Retrieve user data from localStorage, if available
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Hello {storedUser?.firstName }!</h1>
      <h1>Hello {storedUser?.lastName }!</h1>
    </div>
  );
};

export default Profile;
