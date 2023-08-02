import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Profile/locationModal';

const Pfp = () => {
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState(null);
  const [userLocations, setUserLocations] = useState([]); // Add userLocations state
  const history = useNavigate();
  const userId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then((response) => {
        setUser(response.data);
        setUserLocations(response.data.locations); // Set userLocations from the response
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleFileChange = (event) => {
    setSelectedProfilePic(event.target.files[0]);
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
      setUserLocations([...userLocations, selectedLocation]);
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
    <div>
      <h1>You're Almost There!</h1>
      <h2>Upload a Profile Picture</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <input
        type="tel"
        placeholder="Phone Number"
        onChange={(e) => {
          const phoneNumber = e.target.value.replace(/\D/g, '');
          setPhoneNumber(phoneNumber);
        }}
        onKeyPress={(e) => {
          const keyCode = e.keyCode || e.which;
          const keyValue = String.fromCharCode(keyCode);
          const numericRegex = /^[0-9]*$/;
          if (!numericRegex.test(keyValue)) {
            e.preventDefault();
          }
        }}
        required
      />

      {/* Button to open the modal */}
      <button onClick={handleOpenModal}>
        Update Preferred Locations
      </button>

      {/* Render the modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={(location) => setSelectedLocation(location)}
        onDelete={() => {}}
        user={user}
        userLocations={userLocations} // Pass userLocations to the modal
      />

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Pfp;
