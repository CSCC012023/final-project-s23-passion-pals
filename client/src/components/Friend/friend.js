import React, { useState, useEffect } from 'react';
import './search.css'; // Import the searchStyles.css file

const Friend = () => {
  // Component code

  return (
    <div className="friend-container">
      <input type="text" placeholder="Search..." />
      <div className="search"></div>
    </div>
  );
};

export default Friend;
