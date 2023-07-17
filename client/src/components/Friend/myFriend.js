import React, { useState } from 'react';

const FriendList = () => {
  const [friendList, setFriendList] = useState(['John', 'Jane', 'Mark']);

  return (
    <div>
      <h1>Friend List</h1>
      <ul>
        {friendList.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
