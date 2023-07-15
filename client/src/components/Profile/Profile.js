import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

/**
 * Profile component to display user profile details.
 * Fetches user data from the server and renders the profile information.
 * Allows users to edit their profile and manage subscriptions.
 */
export default function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers?userId=${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-picture">
          <img src="profile-picture.jpg" alt="Profile" />
        </div>

        <div className="profile-details">
          {user && (
            <>
              <h2>{user.fname} {user.lname}</h2> 
              <p className="email">{user.email}</p>
            </>
          )}
        </div>

        <Link to="/updateProfile" className="edit-button">
          Edit Profile
        </Link>
        <br />
        <Link to="/selectEdit" className="edit-button">
          Manage Subscriptions
        </Link>
        <br />
        <Link to="/myEvents" className="edit-button">
          My Created Events
        </Link>
      </div>
    </div>
  );
}