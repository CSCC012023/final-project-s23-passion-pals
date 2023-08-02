import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Profile/locationModal';
import './pfp.css';
import canadaFlag from '../../images/canada-flag.png'; // Import the Canada flag image

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
      history('/select');
    } catch (error) {
      // Handle the error if needed
    }
  };

  // Function to update the user's location in the database
  const updateLocation = async () => {
    try {
      // Make a POST request to the server to add the location
      await axios.post(`http://localhost:5000/addLocation/${userId}`, {
        location: selectedLocation,
      });
      console.log('Location added successfully');
      setSelectedLocation(''); // Clear the selected location after adding it

      // Update the user's locations after adding a new location
      setUser((prevUser) => ({
        ...prevUser,
        locations: [...prevUser.locations, selectedLocation],
      }));
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal and update the location
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (selectedLocation) {
      updateLocation();
    }
  };

  return (
    <div className="pfp-container">
      <h1 className="pfp-title">Congratulations! You're almost there. Just a few quick steps away from completing your profile setup.</h1>

      <div className="step-container">
        <h2 className="step-title">STEP 1: Enter your phone number</h2>
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
      </div>

      <div className="step-container">
        <h2 className="step-title">STEP 2: Upload your profile picture</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="profile-picture-input"
        />
      </div>

      <div className="step-container">
        <h2 className="step-title">STEP 3: Set your preferred locations</h2>
         {/* Location icon to open the modal */}
        <div className="location-icon" onClick={handleOpenModal}>
          <i className="fa fa-map-marker" aria-hidden="true"></i>
        </div>
      </div>

      {/* Render the modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={(location) => setSelectedLocation(location)}
        onDelete={() => {}}
        user={user}
      />

      <div className="step-container">
        <button onClick={handleSubmit} className="submit-button">
          Go to Step 4
        </button>
      </div>
    </div>
  );
};
export default Pfp;
