import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./dashBoard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [eventIds, setEventIds] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers?userId=${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    axios.get(`http://localhost:5000/getUsers?userId=${userId}`)
      .then(response => {
        const user = response.data;
        if (user) {
          setEventIds(user.enrolledEvents);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]); //is there a way to merge these useEffect

  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then(response => {
        const filteredEvents = response.data.filter(event => eventIds.includes(event._id));
        setEvents(filteredEvents);
      })
      .catch(error => {
        console.log(error);
      });
  }, [eventIds]);

  return (
    <div className='dashboard'>
      <div className='dash-head'>
        <h1 className='welcome-text'>
          Hello {user && user.fname}!
        </h1>
      </div>
      <div className='dash-body'>
        <h1>
          You Have Signed Up For:
        </h1>

        {events.length === 0 ? (
          <p>No events found. Click Find Events to :&#41;</p>
        ) : (
          events.map(event => (
            <div key={event._id} className="event-card">
              <div className="event-image-container">
                <img src={event.eventImage} alt="Event" className="event-image" />
              </div>
              <div className="event-content">
                <p className="event-name">Name: {event.eventName}</p>
                <p className="event-location">Location: {event.eventLocation}</p>
                <p className="event-date">Date: {event.eventDate}</p>
                <p className="event-price">Price: {event.eventPrice}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
