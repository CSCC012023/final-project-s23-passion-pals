import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

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
    <div className="container">
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
      </div>
    </div>
  );
}