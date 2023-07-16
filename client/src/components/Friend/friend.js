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

  let filteredData = [];
  if (data && data.length > 0) {
    filteredData = data.filter(item =>
      (item.fname && item.fname.toLowerCase().includes(query.toLowerCase())) ||
      (item.lname && item.lname.toLowerCase().includes(query.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(query.toLowerCase()))
    );
  }

  return (
    <div className="friend-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <div className="search"></div>
      <div id="users">
        <ul id="users_ul">
          {filteredData.map((item, index) => {
            const { fname, lname, email } = item;
            const fullName = `${fname} ${lname}`;

            return (
              <li key={index}>
                <div className="name">{fullName}</div>
                <div className="email">{email}</div>
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
