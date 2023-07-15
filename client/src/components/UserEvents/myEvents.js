import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEvents = () => {
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers?userId=${userId}`)
      .then((response) => {
        setUser(response.data);
        fetchUserEvents(response.data.email); // Fetch events using the user's email
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const fetchUserEvents = (userEmail) => {
    axios
      .get(`http://localhost:5000/getEvents?eventCreator=${userEmail}`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>My Events</h2>
      {userEvents.length === 0 ? (
        <p>You haven't created any events yet!.</p>
      ) : (
        <ul>
          {userEvents.map((event) => (
            <li key={event._id}>
              {/* Render event details here */}
              <p>Event Name: {event.eventName}</p>
              <p>Event Creator: {event.eventCreator}</p>
              {event.eventLink !== "" && (
                <p>
                  Event Link:{" "}
                  <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                    {event.eventLink}
                  </a>
                </p>
              )}
          
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
