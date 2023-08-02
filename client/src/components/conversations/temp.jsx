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

  return (
    <div className="conversation">
      {user && (
        <>
          <img className='conversationImg' 
          src={
            user.profilePic
                ? user.profilePic
                : img1
          } />
          <span className="conversationName">{user.fname}</span>
        </>
      )}
    </div>
  );
}
