// UserUpdateComp.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userUpdate'; // Make sure this import is correct

const UserUpdateComp = () => {
  const dispatch = useDispatch();
 const storedUser = JSON.parse(localStorage.getItem('user'));
  userId = storedUser._id
  const userUpdateStatus = useSelector((state) => state.userUpdate.status);
  const error = useSelector((state) => state.userUpdate.error);

  const [formData, setFormData] = useState({
    address: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the updateUser action with userId and formData
    dispatch(updateUser({ userId, data: formData }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <button type="submit" disabled={userUpdateStatus === 'loading'}>
        Update User Data
      </button>
      {userUpdateStatus === 'loading' && <p>Loading...</p>}
      {userUpdateStatus === 'failed' && <p>Error: {error}</p>}
    </form>
  );
};

export default UserUpdateComp;
