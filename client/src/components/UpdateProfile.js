// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import './Profile.css';

// function UpdateProfile() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userId = localStorage.getItem('userId');

//     axios
//       .put(`http://localhost:5000/users/${userId}`, {
//         fname: firstName,
//         lname: lastName,
//         email: email,
//       })
//       .then((response) => {
//         console.log('Profile updated successfully');
//         navigate('/profile'); // Navigate to the /profile route
//       })
//       .catch((error) => {
//         console.error('Error updating profile:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <h2>Update Profile</h2>
//       <form className="profile" onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="edit-button">Update</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';

function UpdateProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers?userId=${userId}`)
      .then((response) => {
        const user = response.data;
        setFirstName(user.fname);
        setLastName(user.lname);
        setEmail(user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/users/${userId}`, {
        fname: firstName,
        lname: lastName,
        email: email,
      })
      .then((response) => {
        console.log('Profile updated successfully');
        navigate('/profile'); // Navigate to the /profile route
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="container">
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            className="form-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
