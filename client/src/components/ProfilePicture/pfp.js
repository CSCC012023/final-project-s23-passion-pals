import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Pfp = () => {
    const [selectedProfilePic, setSelectedProfilePic] = useState(null);
    const history = useNavigate();

    const handleFileChange = (event) => {
        // Update the selectedProfilePic state with the chosen file
        setSelectedProfilePic(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem("userId");
        try {
        // Create a new FormData object and append the selected profile picture to it
        const formData = new FormData();
        formData.append("profilePic", selectedProfilePic);

        // Send a POST request to the server to upload the profile picture
        await axios.post(`http://localhost:5000/upload-profile-pic/${userId}`, formData);

        // Navigate to the next page (choose interests page) after the profile picture is uploaded
        history("/select");
        } catch (error) {
        // Handle the error if needed
        }
    };
    
    return (
        <div>
          <h1>You're Almost There!</h1>
          <h2>Upload a Profile Picture</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      );
    };

export default Pfp