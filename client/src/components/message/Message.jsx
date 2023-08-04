import React from 'react';
import "./message.css";
import img1 from "../../images/user-circle.png";
import { format } from "timeago.js";

export default function Message({ message, own, profilePic, firstName, lastName, conversation }) {

   const showName = conversation.hasOwnProperty('eventId');

  const handleImageError = (event) => {
    event.target.src = img1;
  };

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {showName && <p className='messageUsername'>{own ? '' : `${firstName} ${lastName}`}</p>}
        <img
          className='messageImg'
          src={`data:image/jpeg;base64,${profilePic}`}
          alt=""
          onError={handleImageError} 
        />
        <p className= 'messageText'>
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
