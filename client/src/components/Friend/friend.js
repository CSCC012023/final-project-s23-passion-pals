import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list.css';
import './search.css';
import img1 from '../../images/user-circle.png';

const Friend = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const userId = localStorage.getItem('userId'); // Get the current user's ID from localStorage

  let filteredData = [];
  if (data && data.length > 0) {
    filteredData = data.filter(
      (item) =>
        (item.fname &&
          item.fname.toLowerCase().includes(query.toLowerCase())) ||
        (item.lname &&
          item.lname.toLowerCase().includes(query.toLowerCase())) ||
        (item.email &&
          item.email.toLowerCase().includes(query.toLowerCase()))
    );
  }

  filteredData = filteredData.filter((item) => item._id !== userId);

  const handleButtonClick = async (userIdToAdd) => {
    if (userId === userIdToAdd) {
      console.log("Cannot add yourself as a friend");
      alert("Cannot add yourself as a friend");
      return;
    }
  
    try {
      // Check if the user you are trying to add is already in your friend list
      const response = await axios.get(`/checkFriendStatus/${userId}/${userIdToAdd}`);
  
      if (response.data === 'friends') {
        console.log('You are already friends');
        alert('You are already friends');
        return;
      }
      if (response.data === 'in_request') {
        console.log('The other person already sent you friend request');
        alert('The other person already sent you friend request');
        return;
      }
      
      // Send a friend request to the user with userIdToAdd
      const response2 = await axios.post(`/addFriendRequest/${userIdToAdd}`, {
        senderId: userId,
      });
  
      console.log('Friend request sent:', response2.data);
      alert('Friend request sent successfully :)');
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleDeleteClick = async (friendIdToDelete) => {
    if (userId === friendIdToDelete) {
      console.log("Cannot remove yourself as a friend");
      alert("Cannot remove yourself as a friend");
      return;
    }
  
    try {
      const response = await axios.delete(`/removeFriend/${userId}`, {
        data: { friendId: friendIdToDelete },
      });
  
      if (response.data.success) {
        console.log('Friend removed:', friendIdToDelete);
        alert('Friend removed successfully :)');
      } else if (response.data.needToAdd) {
        console.log('You need to be friends first');
        alert('You need to be friends first');
      } else {
        console.log('Friend removal failed:', friendIdToDelete);
      }
    } catch (error) {
      console.log('An error occurred while removing friend:', error);
    }
  };
  
  
  

  return (
    <div className="background-container">
      <div className="friend-container">
      <div className="left-container">
          <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="search"></div>
        {query !== '' && (
          <div id="users">
            <ul id="users_ul">
              {filteredData.map((item, index) => {
                const { fname, lname, email, _id, profilePic } = item;
                const fullName = `${fname} ${lname}`;
  
                return (
                  <li key={index} className="user-item">
                    <div className="profile-pic">
                      <img
                        src={profilePic ? `data:image/jpeg;base64,${profilePic}` : img1}
                        alt={fullName}
                      />
                    </div>
                    <div className="user-info">
                      <div className="name">{fullName}</div>
                      <div className="email">{email}</div>
                    </div>
                    <div className="button-container">
                      <button className="add-button" onClick={() => handleButtonClick(_id)}>
                        Add
                      </button>
                      <button className="remove-button" onClick={() => handleDeleteClick(_id)}>
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>

  );
  
};

export default Friend;
