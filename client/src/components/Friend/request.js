import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './request.css';
import './search.css';

const FriendList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`/friendRequests/${localStorage.getItem('userId')}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriendRequests();
  }, []);


  





  const handleAcceptRequest = async (userIdToAdd, friendName) => {
    try {
      const response = await axios.post(`/addFriend/${userIdToAdd}`, {
        friendId: localStorage.getItem('userId'),
      });

      if (response.data.status === 'success') {
        // Filter out the accepted request from the data state
        setData((prevData) => prevData.filter((item) => item._id !== userIdToAdd));
        console.log('Friend request accepted:', response.data);

        //remove from senders list
        const removeSentRequestResponse = await axios.delete(`/removeSentRequest/${userIdToAdd}/${localStorage.getItem('userId')}`);
        console.log('Sent request removed:', removeSentRequestResponse.data);
        // Get the current user's ID from localStorage
    const currentUserId = localStorage.getItem('userId');

    // Check if the conversation with the friend already exists based on conditions
    const checkConversationResponse = await axios.get(`/checkValidConversation/${currentUserId}/${userIdToAdd}`);
    const conversationExists = checkConversationResponse.data.hasValidConversation;

        if (!conversationExists) {
       
          const conversationObject = {
            members: [localStorage.getItem('userId'), userIdToAdd],
            event: friendName, 
          };

          try {
        
            const conversationResponse = await axios.post(
              "http://localhost:5000/createConversation",
              conversationObject
            );
            console.log("Conversation created:", conversationResponse.data);
        
          } catch (error) {
            console.error("Error creating conversation:", error);
        
          }
        } else {
          console.log('Conversation already exists with this friend.');
        }
      } else {
        console.log('Error accepting friend request:', response.data);
      
      }
    } catch (error) {
      console.log('Error accepting friend request:', error);
    }
  };





  const handleDeclineRequest = async (userIdToDecline) => {
    try {
      const response = await axios.delete(`/declineFriendRequest/${localStorage.getItem('userId')}/${userIdToDecline}`);
  
      if (response.data.success) {
        // Filter out the declined request ID from the data state
        setData((prevData) => prevData.filter((item) => item._id !== userIdToDecline));
        console.log('Friend request declined:', response.data);
                //remove from senders list
                const removeSentRequestResponse = await axios.delete(`/removeSentRequest/${userIdToDecline}/${localStorage.getItem('userId')}`);
                console.log('Sent request removed:', removeSentRequestResponse.data);
        // Update the UI or any other actions for successful decline
      } else {
        console.log('Error declining friend request:', response.data);
        // Handle the case where there was an error declining the friend request
      }
    } catch (error) {
      console.log('Error declining friend request:', error);
    }
  };
  
  
  

  return (
    <div className="background-container">
      <div className="friend-container">
        <div id="users">
          <ul id="users_ul">
            {data.map((item, index) => {
              const { fname, lname, email, _id } = item;
              
              const fullName = `${fname} ${lname}`;

              return (
                <li key={index}>
                  <div className="name">{fullName}</div>
                  <div className="email">{email}</div>

                  <div className="button-container">

                    <button onClick={() => handleAcceptRequest(_id)}>Accept</button>
                    <button onClick={() => handleDeclineRequest(_id)}>Decline</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <span>Number of friend requests: {data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
