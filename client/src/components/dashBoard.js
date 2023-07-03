import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>Dash board</h1>
      <div>
        <Link to="/profile">User Profile page</Link>
      </div>
      <div>
        <Link to="/createEvent">Event Creation page</Link>
      </div>
      <div>
        <Link to="/eventCard">Event card page</Link>
      </div>
    </div>
  );
}
