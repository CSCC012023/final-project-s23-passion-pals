import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './eventCard.css';

export default function EventCard() {
  const [events, setEvents] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get(`http://localhost:5000/getUsers?userId=${userId}`)
      .then(response => {
        const user = response.data;
        if (user) {
          setEnrolledEvents(user.enrolledEvents);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEnroll = (eventId) => {
    const userId = localStorage.getItem("userId");

    if (enrolledEvents.includes(eventId)) {
      // Unenroll from the event
      axios.post(`http://localhost:5000/unenroll/${eventId}`, { userId })
        .then(() => {
          setEnrolledEvents(prevEnrolledEvents =>
            prevEnrolledEvents.filter(id => id !== eventId)
          );
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Enroll in the event
      axios.post(`http://localhost:5000/enroll/${eventId}`, { userId })
        .then(() => {
          setEnrolledEvents(prevEnrolledEvents => [...prevEnrolledEvents, eventId]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div className="event-card-container">
      {events.map(event => (
        <div key={event._id} className="event-card">
          <div className="event-image-container">
            <img src={event.eventImage} alt="Event" className="event-image" />
          </div>
          <div className="event-content">
            <h2 className="event-name">{event.eventName}</h2>
            <p className="event-location">Location: {event.eventLocation}</p>
            <p className="event-date">Date: {event.eventDate}</p>
            <p className="event-price">Price: {event.eventPrice}</p>
            <p className="event-description">Description: {event.eventDescription}</p>
            <p className="event-spots-left">Spots Left: {event.spots - enrolledEvents.filter(id => id === event._id).length}</p>
            {enrolledEvents.includes(event._id) ? (
              <button onClick={() => handleEnroll(event._id)}>Unenroll</button>
            ) : (
              <button onClick={() => handleEnroll(event._id)} disabled={event.spots - enrolledEvents.filter(id => id === event._id).length <= 0}>
                {event.spots - enrolledEvents.filter(id => id === event._id).length <= 0 ? 'Full' : 'Enroll Now'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
