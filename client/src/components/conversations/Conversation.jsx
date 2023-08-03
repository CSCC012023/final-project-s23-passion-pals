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


  const isGroupChat = conversation.members.length >2;
  let groupChatName;
  let imageSrc;

  if (isGroupChat) {
    groupChatName = conversation.event;
    imageSrc = "https://cdn.vectorstock.com/i/preview-1x/26/58/chatting-group-icon-black-graphics-vector-38952658.jpg";
  } else {
    groupChatName = user ? `${user.fname} ${user.lname}` : "Loading...";
    imageSrc = user && user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : img1;
  }

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
