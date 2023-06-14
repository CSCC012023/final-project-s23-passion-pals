import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom"

function UpdateProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = '64892a3c865802a7317ea363'; // Replace with the actual user ID

    // Make a PUT request to update the user's profile data
    axios
      .put(`http://localhost:5000/users/${userId}`, {
        fname: firstName,
        lname: lastName,
        email: email,
      })
      .then((response) => {
        // Handle successful update
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>

    </div>
  );
}

export default UpdateProfile;
