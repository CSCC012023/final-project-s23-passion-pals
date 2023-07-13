import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./dashBoard.css";

/**
 * Dashboard component displays user information and events.
 */
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [eventIds, setEventIds] = useState([]);
  const [events, setEvents] = useState([]);

  /**
   * Fetches user data from the server based on the user ID.
   */
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

  /**
   * Fetches the enrolled event IDs of the user.
   */
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
  }, [userId]);

  /**
   * Fetches the events based on the enrolled event IDs.
   */
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
    <div className='dashboard'
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/918401.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}>
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
          <div className="event-card-container">
            {events.map(event => (
              <div key={event._id} className="event-card">
                <div className="event-image-container">
                  <div class="event-image" style={{ backgroundImage: `url(${event.eventImage})`}}></div>
                </div>
                <div className="event-body">
                  <div className="event-body-top">
                    <span className="event-date subtle-styled-text">{new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="event-spots subtle-styled-text float-right">{event.spots} spots left</span>
                  </div>
                  <div className="event-body-middle"> 
                    <span className="event-name">{event.eventName}</span>
                    <br></br>
                    <span className="event-description">{event.eventDescription}</span>
                  </div>
                  <div className="event-body-bottom">
                    <span className="event-location event-body-bottom-text subtle-styled-text">{event.eventLocation}</span>
                    <span className="event-price event-body-bottom-text subtle-styled-text float-right">
                      {event.eventPrice.startsWith("$") ? event.eventPrice : `$${event.eventPrice}`}
                    </span>
                  </div>
                  <div className="event-body-bottom event-body-bottom-reveal">
                    <span className="event-theme event-body-bottom-text subtle-styled-text">{event.eventTheme}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}   
      </div>
    </div>
  );
};

