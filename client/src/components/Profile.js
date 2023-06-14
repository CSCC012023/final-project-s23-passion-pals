import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState(null);
  const userId = '64892a3c865802a7317ea363'; 

  useEffect(() => {
    axios.get(`http://localhost:5000/getUsers?userId=${userId}`)
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
