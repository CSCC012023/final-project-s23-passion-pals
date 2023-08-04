import React, { useState, useEffect } from 'react';
import "./conversation.css";
import img1 from "../../images/user-circle.png";
import Axios from 'axios';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await Axios.get(`http://localhost:5000/getUsers/${friendId}`);
        setUser(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);



  // Determine the chat name based on the number of members and the event field
  const hasEvent = conversation.hasOwnProperty('event');

  const isGroupChat = conversation.members.length > 2 || hasEventId;
  const groupChatName = isGroupChat ? conversation.event : user ? `${user.fname} ${user.lname}` : "Loading...";
  const imageSrc = isGroupChat ? "https://cdn.vectorstock.com/i/preview-1x/26/58/chatting-group-icon-black-graphics-vector-38952658.jpg" : user && user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : img1;


  return (
    <div className="conversation">
      {user && (
        <>
          <img
            className='conversationImg'
            src={imageSrc}
            alt="User Profile"
          />
          <span className="conversationName">{groupChatName}</span>
        </>
      )}
    </div>
  );
}