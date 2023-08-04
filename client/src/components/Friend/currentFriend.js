import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './currentFriend.css';
import './search.css';

const CurrentFriendList = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`/getFriendList/${localStorage.getItem('userId')}`);
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriends();
  }, []);

  const handleSendMessage = async (friendId, friendName) => {
    try {
      // Check if the conversation with the friend already exists based on conditions
      const checkConversationResponse = await axios.get(`/checkValidConversation/${localStorage.getItem('userId')}/${friendId}`);
      const conversationExists = checkConversationResponse.data.hasValidConversation;

      if (!conversationExists) {
        // Create a new conversation with the friend
        const conversationObject = {
          members: [localStorage.getItem('userId'), friendId],
          event: friendName,
        };

        const conversationResponse = await axios.post('/createConversation', conversationObject);
        console.log('Conversation created:', conversationResponse.data);
        // You can do further actions if needed after successful conversation creation
      } else {
        console.log('Conversation already exists with this friend.');
      }

      // Redirect to the messenger page regardless of whether the conversation exists or was just created
      navigate(`/messenger?friendId=${friendId}`);
    } catch (error) {
      console.error('Error creating or checking conversation:', error);
    }
  };

  return (
    <div className="background-container">
      <div className="friend-container">
        <div id="users">
          <ul id="users_ul">
            {friends.map((friend) => {
              const { fname, lname, email, _id } = friend;
              const fullName = `${fname} ${lname}`;

              return (
                <li key={_id}>
                  <div className="name">{fullName}</div>
                  <div className="email">{email}</div>
                  <div className="button-container">
                    {/* Pass the selected conversation ID in the URL */}
                    <button className="add-button" onClick={() => handleSendMessage(_id, fullName)}>
                      Message
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <span>Number of friends: {friends.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentFriendList;
