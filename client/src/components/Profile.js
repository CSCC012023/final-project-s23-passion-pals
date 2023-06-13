import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState(null);
  const userId = '6483d98c674f146b488f0503'; 

  useEffect(() => {
    axios.get(`http://localhost:3001/getUsers?userId=${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {user && (
            <tr>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.email}</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/updateProfile">Edit user profile Page</Link>
    </div>

  );
}
