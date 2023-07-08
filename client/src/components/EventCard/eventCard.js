import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CheckBox from '../checkbox';
import './eventCard.css';

export default function EventCard() {
  const [events, setEvents] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [filters, setFilters] = useState({
    themes: []
  });

  // Get all events
  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const userId = localStorage.getItem('userId');
  // Get all events that the user is enrolled in
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers?userId=${userId}`)
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

  useEffect(() => {
    const storedFilters = localStorage.getItem('filters');
    if (storedFilters) {
      setFilters(JSON.parse(storedFilters));
    }
  }, []);

  // Enroll or unenroll from an event
  const handleEnroll = (eventId) => {
    if (enrolledEvents.includes(eventId)) {
      // Unenroll from the event
      axios
        .post(`http://localhost:5000/unenroll/${eventId}`, { userId })
        .then(() => {
          setEnrolledEvents(prevEnrolledEvents =>
            prevEnrolledEvents.filter(id => id !== eventId)
          );
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Enroll in the event
      axios
        .post(`http://localhost:5000/enroll/${eventId}`, { userId })
        .then(() => {
          setEnrolledEvents(prevEnrolledEvents => [...prevEnrolledEvents, eventId]);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Handle filters
  const handleFilters = (selectedFilters, category) => {
    const newFilters = { ...filters };
    newFilters[category] = selectedFilters;
    setFilters(newFilters);
    localStorage.setItem('filters', JSON.stringify(newFilters));
  };

  // Show filter results
  useEffect(() => {
    showFilterResults(filters);
  }, [filters]);

  const showFilterResults = (filters) => {
    const { themes } = filters;
    const params = {
      themes
    };

    axios
      .get('http://localhost:5000/events', { params })
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Show all events displayed as cards. Each card has an image, name, location, date, price, description, spots, and a button to enroll or unenroll from the event
  // Cards generated from data in the database
  return (
    <div className="event-card-container">
      <CheckBox handleFilters={selectedFilters => handleFilters(selectedFilters, 'themes')} />
      {events.map(event => (
        <div key={event._id} className="event-card">
          <div className="event-image-container">
            <img src={event.eventImage} alt="Event" className="event-image" />
          </div>
          <div className="event-content">
            <div className="event-col">
              <h2 className="event-name">{event.eventName}</h2>
            </div>
            <div className="event-col">
              <p className="event-location">Location: {event.eventLocation}</p>
              <p className="event-date">Date: {new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="event-price">Price: {event.eventPrice}</p>
            </div>
            <div className="event-col">
              <p className="event-description">Description: {event.eventDescription}</p>
              <p className="event-spots">Spots: {event.spots}</p>
            </div>
            {enrolledEvents.includes(event._id) ? (
              <button onClick={() => handleEnroll(event._id)}>Unenroll</button>
            ) : (
              <button onClick={() => handleEnroll(event._id)} disabled={event.spots <= 0}>Enroll Now</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
