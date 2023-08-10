import React, { } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

import './PopupNotification.css';

const PopupNotification = ({ handleClick }) => {


  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleNotificationClick = () => {

    // Navigate to the Request page when the notification is clicked
    navigate('/request');
  };

  return (
    <div id="reminderContainer" onClick={handleClick}>
      <div id="reminderHeader">
        <span>New Friend Request!</span>
      </div>
      <div id="reminderContent">
        <img
          id="twitchLogo"
          src="https://cdn-icons-png.flaticon.com/512/8131/8131340.png"
          alt="Twitch Logo"
        />
        <div id="reminderContentText">
          <span>You have a new friend request! Click to view :)</span>
        </div>
      </div>
    </div>
  );
};

export default PopupNotification;
