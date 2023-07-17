import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list.css';
import './search.css';

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

  const handleButtonClick = async (userIdToAdd) => {
    if (userId === userIdToAdd) {
      console.log("Cannot add yourself as a friend");
      return;
    }
  
    try {
      const response = await axios.post(`/addFriend/${userId}`, {
        friendId: userIdToAdd,
      });
      console.log('Friend added:', response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeleteClick = async (friendIdToDelete) => {
    
    try {
      const response = await axios.delete(`/removeFriend/${userId}`, {
        data: { friendId: friendIdToDelete },
      });
  
      if (response.data.success) {
        console.log('Friend removed:', friendIdToDelete);
        
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
    <div className="friend-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="search"></div>
      <div id="users">
        <ul id="users_ul">
          {filteredData.map((item, index) => {
            const { fname, lname, email, _id } = item;
            const fullName = `${fname} ${lname}`;

            return (
              <li key={index}>
                <div className="name">{fullName}</div>
                <div className="email">{email}</div>
                <div className="button-container">
                  <button onClick={() => handleButtonClick(_id)}>Add</button>
                  <button onClick={() => handleDeleteClick(_id)}>Remove</button>
                </div>
              </li>
            );
          })}
        </ul>
        <span>Number of users: {filteredData.length}</span>
      </div>
    </div>
  );
};

export default Friend;
