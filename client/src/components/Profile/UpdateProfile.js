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
          setFirstName(user.fname); // Set the initial first name value
          setLastName(user.lname); // Set the initial last name value
          setEmail(user.email); // Set the initial email value
        })
        .catch((error) => {
          console.log(error);
        });
    }, [userId]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios
        .put(`http://localhost:5000/users/${userId}`, {
          fname: firstName, // Pass the updated first name
          lname: lastName, // Pass the updated last name
          email: email, // Pass the updated email
        })
        .then((response) => {
          console.log('Profile updated successfully');
          navigate('/profile'); // Navigate to the /profile route after successful update
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    };
    // In the above code, we define the JSX structure for the profile update form. It consists of a div container with the class name 
    //"update-container". Inside the container, we have a form element with the class name "update-form". The form contains multiple div elements with the class name 
    //"form-group", each representing a form input field.

    // For each form input field (first name, last name, and email), we have a label element and an input element. The value attribute of e
    //ach input field is set to the corresponding state variable (firstName, lastName, and email), and the onChange attribute is assigned a function to update the respective state variable.
    
    // Lastly, we have a submit button with the class name "update-button" and a click event handler assigned to the handleSubmit function, which will be called when the form is submitted.
  return (
    <div className="update-container">
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
