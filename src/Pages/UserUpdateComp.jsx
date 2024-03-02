// UserUpdateComp.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userUpdate";

const UserUpdateComp = () => {
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const userUpdateStatus = useSelector((state) => state.userUpdate.status);
  const error = useSelector((state) => state.userUpdate.error);

  const [formData, setFormData] = useState({
    address: storedUser.address || "",
    phoneNumber: storedUser.phoneNumber || "",
    firstName:storedUser.firstName || "",
    lastName:storedUser.lastName || "",
    email:storedUser.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => {
        // Check if the value is a string before calling trim()
        return typeof value === 'string' && value.trim() !== '';
      })
    );
  
    dispatch(updateUser({ userId: storedUser._id, data: filteredData }));
  
    const updatedUser = { ...storedUser, ...filteredData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange} required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" disabled={userUpdateStatus === "loading"}>
        Update User Data
      </button>
      {userUpdateStatus === 'loading' && <p>Loading...</p>}
      {userUpdateStatus === 'failed' && <p>Error: {error}</p>}
    </form>
  );
};

export default UserUpdateComp;
