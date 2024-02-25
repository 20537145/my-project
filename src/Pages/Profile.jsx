import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()
  const navigateHandle = () =>{
    navigate(`/profile/${storedUser._id}`)
  }

  return (
    <div>
      <h1>Hello {storedUser?.firstName } {storedUser?.lastName }!</h1>
      <div className='userInfo'>
      <h2>MES ADRESSES</h2>
      <h3>{!storedUser?.address?'No addresses were saved yet':storedUser?.address}</h3>
      </div>
      { storedUser && <div>
        <button onClick={navigateHandle} className='btn'>changer vos informations</button>
      </div>}
    </div>
  );
};

export default Profile;
