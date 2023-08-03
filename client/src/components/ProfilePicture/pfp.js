import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Profile/locationModal';
import './pfp.css';
import canadaFlag from '../../images/canada-flag.png'; // Import the Canada flag image
import Interests from '../interestSelection/selectInterest';

const Pfp = () => {
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('+1');
  const [user, setUser] = useState(null);
  const history = useNavigate();
  const userId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleFileChange = (event) => {
    setSelectedProfilePic(event.target.files[0]);
  };

  const handlePhoneNumberChange = (event) => {
    // Remove non-numeric characters from the input value and add "+1" prefix
    const phoneNumber = "+1" + event.target.value.replace(/\D/g, '');
    setPhoneNumber(phoneNumber);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    try {
      // Create a new FormData object and append the selected profile picture to it
      const formData = new FormData();
      formData.append('profilePic', selectedProfilePic);

      // Send a POST request to the server to upload the profile picture
      await axios.post(`http://localhost:5000/upload-profile-pic/${userId}`, formData);

      // Make a POST request to update the phone number
      await axios.post('http://localhost:5000/updatePhoneNumber', {
        userId,
        phoneNumber,
      });
      

      // Navigate to the next page (choose interests page) after the profile picture is uploaded
      history('/dash');
    } catch (error) {
      // Handle the error if needed
    }
  };

  // Function to update the user's location in the database
  const updateLocation = async () => {
    try {
      // Make a POST request to the server to add the location
      if (selectedLocation && !user.locations.includes(selectedLocation)) {
        await axios.post(`http://localhost:5000/addLocation/${userId}`, {
          location: selectedLocation,
        });
        console.log('Location added successfully');
        setSelectedLocation(''); // Clear the selected location after adding it
        setUser((prevUser) => ({
          ...prevUser,
          locations: [...prevUser.locations, selectedLocation],
        }));
      }
      // Update the user's locations after adding a new location
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleDeleteLocation = async (locationIndex) => {
    try {
      // Make a DELETE request to the server to remove the location from the user's profile
      const response = await axios.delete(`http://localhost:5000/removeLocation/${userId}`, {
        data: {
          locationIndex: locationIndex
        }
      });

      // Check the response status and update the user's locations if successful
      if (response.status === 200) {
        setUser((prevUser) => {
          const updatedUser = { ...prevUser };
          updatedUser.locations.splice(locationIndex, 1);
          return updatedUser;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Only call the handleSubmit function when selectedLocation is not empty
    if (selectedLocation.length) {
      updateLocation();
    }
  }, [selectedLocation]);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal and update the location
  const handleCloseModal = () => {
    if (user.locations.length > 0) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="pfp-container">
      <h1 className="pfp-heading">Congratulations! You're almost there. Just a few quick steps away from completing your profile setup.</h1>

      <div className="step-container">
        <br />
        <h2 className="step-title">STEP 1: Enter your phone number</h2>
        <br />
        <div className="phone-input-container">
          <img src={canadaFlag} alt="Canada Flag" className="canada-flag" />
          <span className="phone-prefix">+1</span>
          <input
            type="tel"
            className="phone-input"
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <br />

    
        <h2 className="step-title">STEP 2: Upload your profile picture</h2>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="profile-picture-input"
        />
        <br />

    
        <h2 className="step-title">STEP 3: Set your preferred locations</h2>
        <br />
        {/* Location icon to open the modal */}
        <div className="location-icon" onClick={handleOpenModal}>
          <i className="fa fa-map-marker" aria-hidden="true"></i>
        </div>

        <br />
    
      {/* Render the modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={(location) => setSelectedLocation(location)}
        onDelete={handleDeleteLocation}
        user={user}
      />


        <h2 className="step-title">STEP 4: Choose your interests</h2>
        <Interests />

        <br />
  </div>

      <button onClick={handleSubmit} className="submit-button">
          Create Account!
        </button>
    </div>
  );
};
export default Pfp;
