import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import Modal from './locationModal'

/**
 * Profile component to display user profile details.
 * Fetches user data from the server and renders the profile information.
 * Allows users to edit their profile and manage subscriptions.
 */
export default function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const [isError, setIsError] = useState(false); // State for error handling

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`) // Use the updated route with the user ID
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedLocation]);

  const handleSubmit = async () => {

    try {
      // Update the user's locations array
      console.log(selectedLocation)
      if (selectedLocation && !user.locations.includes(selectedLocation)) {
        await axios.post(`http://localhost:5000/addLocation/${userId}`, {
          location: selectedLocation,
        });
        console.log('Location added successfully');
        setSelectedLocation('')
      } else {
        setIsError(true);
        console.log('error')
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError]);

  useEffect(() => {
    // Only call the handleSubmit function when selectedLocation is not empty
    if (selectedLocation) {
      handleSubmit();
    }
  }, [selectedLocation]);

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

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-picture">
          {/* Use the profile picture data from the server */}
          {user && user.profilePic && (
            <img src={`data:image/jpeg;base64,${user.profilePic}`} alt="Profile" />
          )}
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
        <br />
        {/* Button to open the modal */}
        <button onClick={() => setIsModalOpen(true)} className='edit-button'>Update Preferred Locations</button>

        {/* Render the modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(location, e) => {
            e.preventDefault();
            console.log(location)
            setSelectedLocation(location);
          }}
          onDelete={handleDeleteLocation}
          user={user}
        />

      </div>
    </div>
  );
}
