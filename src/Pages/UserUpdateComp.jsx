// UserUpdateComp.js

import React, { useState } from 'react';



const UserUpdateComp = () => {
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Assuming you have the formData state set up correctly
    const response = await fetch(`https://h-royal-backned.onrender.com/profile/:userId`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Use your actual form data here
    });

    if (response.ok) {
      // Handle success (e.g., show a success message)
      console.log('User data updated successfully!');
    } else {
      // Handle error (e.g., show an error message)
      console.error('Error updating user data:', response.statusText);
    }
  } catch (error) {
    console.error('Error communicating with the server:', error);
  }
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
      <button type="submit" >
        Update User Data
      </button>
      
    </form>
  );
};

export default UserUpdateComp;
