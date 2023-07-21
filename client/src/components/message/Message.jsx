import React from 'react';
import "./message.css";
import img1 from "../../images/user-circle.png";
import { format } from "timeago.js";

export default function Message({ message, own, profilePic }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className='messageImg'
          src={profilePic || img1} 
          alt=""
        />
        <p className='messageText'>
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
