import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';

function UpdateProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedProfilePic, setSelectedProfilePic] = useState(null);
    const navigate = useNavigate();
  
    const userId = localStorage.getItem('userId');
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/getUsers/${userId}`)
        .then((response) => {
          const user = response.data;
          setFirstName(user.fname); // Set the initial first name value
          setLastName(user.lname); // Set the initial last name value
          setEmail(user.email); // Set the initial email value
          setPhoneNumber(user.phoneNumber); // Set the initial phone number value
        })
        .catch((error) => {
          console.log(error);
        });
    }, [userId]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Create a new FormData object and append the selected profile picture to it
        if(selectedProfilePic) {
          const formData = new FormData();
          formData.append("profilePic", selectedProfilePic);
    
          // Send a POST request to the server to upload the profile picture
          await axios.post(`http://localhost:5000/upload-profile-pic/${userId}`, formData);
        }
  
        // Update the user's profile details (first name, last name, and email)
        await axios.put(`http://localhost:5000/users/${userId}`, {
          fname: firstName,
          lname: lastName,
          email: email,
          phoneNumber: phoneNumber,
        });
  
        console.log('Profile updated successfully');
        navigate('/profile'); // Navigate to the /profile route after successful update
      } catch (error) {
        console.error('Error updating profile:', error);
      }
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
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Update Profile Picture:</label>
          <input
            type="file"
            onChange={(e) => setSelectedProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
