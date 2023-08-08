import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupNotification from './PopupNotification'; // Import the PopupNotification component
import './dashBoard.css';
import EventCard from '../EventCard/eventCard';

/**
 * Dashboard component displays user information and events.
 */
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [recommendedEvents, setRecommended] = useState([]);
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [themes, setThemes] = useState([]);
  const [userEmail, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false); // Initially set to false

  // Fetch user data and other data using useEffect hooks as before

  useEffect(() => {
    // Fetch user data from the server based on the user ID.
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then((response) => {
        setUser(response.data);
        // Check if the user's request list is not empty and set showNotification accordingly
        if (response.data.request && response.data.request.length > 0) {
          setShowNotification(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  /**
   * Fetches user data from the server based on the user ID.
   */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  /**
   * Fetches the enrolled event IDs of the user, their preferred locations, and their themes
   */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then((response) => {
        const user = response.data;
        if (user) {
          setEnrolledEvents(user.enrolledEvents);
          setPreferredLocations(user.locations);
          setThemes(user.interest);
          setEmail(user.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  /**
   * Fetches the events based on the enrolled event IDs and also fetches all events for the recommended filter
   */
  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then((response) => {
        const filteredEvents = response.data.filter((event) =>
          enrolledEvents.includes(event._id)
        );
        setEvents(filteredEvents);
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [enrolledEvents]);

  useEffect(() => {
    filterRecommended();
  }, [preferredLocations, themes, userEmail, enrolledEvents]);

  //from all events it will pick out everything that matches the users set locations,
  //then it will pick out everything that doesn't match the users themes
  const filterRecommended = () => {
    if (preferredLocations && themes) {
      // Parse the user's preferred locations from local storage
      const locationObjects = preferredLocations.map((location) => {
        const parts = location.split(', ');

        let eventCity = '';
        let eventCountry = '';
        let eventRegion = '';

        if (parts.length === 3) {
          [eventCity, eventRegion, eventCountry] = parts;
        } else if (parts.length === 2) {
          [eventRegion, eventCountry] = parts;
        } else if (parts.length === 1) {
          [eventCountry] = parts;
        }

        return { eventCity, eventCountry, eventRegion };
      });

      const locationFiltered = allEvents.filter((event) => {
        // Check if the event matches any of the locationObjects
        return locationObjects.some((locationObject) => {
          return (
            event.eventCountry &&
            event.eventCountry.toLowerCase() ===
            locationObject.eventCountry.toLowerCase() &&
            event.eventRegion.toLowerCase() ===
            locationObject.eventRegion.toLowerCase() &&
            event.eventCity.toLowerCase() ===
            locationObject.eventCity.toLowerCase()
          );
        });
      });

      // Filter events based on themes
      const themeFiltered = locationFiltered.filter((event) => {
        return (
          event.themes &&
          event.themes.some((theme) => themes.includes(theme))
        );
      });

      // Filter user's own events and events they have enrolled inr
      const userFiltered = themeFiltered.filter((event) => {
        return event.eventCreator !== userEmail && !enrolledEvents.includes(event._id);
      });
      setRecommended(userFiltered);
    }
  };

  // Enroll or unenroll from an event
  const handleEnroll = (eventId) => {
    if (enrolledEvents.includes(eventId)) {
      // Unenroll from the event
      axios
        .post(`http://localhost:5000/unenroll/${eventId}`, { userId })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Enroll in the event
      axios
        .post(`http://localhost:5000/enroll/${eventId}`, { userId })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      className='dashboard'
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/918401.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      {showNotification && <PopupNotification />}
      <div className='dash-head'>
        <h1 className='welcome-text'>Hello {user && user.fname}!</h1>
      </div>
      <div className='dash-body'>
        <h1>You Have Signed Up For:</h1>
        {events.length === 0 ? (
          <p>No events found. Click Find Events to :&#41;</p>
        ) : (
          <div className='event-card-container'>
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={false}
                enrolledEvents={enrolledEvents}
                handleEnroll={() => handleEnroll(event._id)}
                handleDeleteEvent={null}
                handleEditEvent={null}
              />
            ))}
          </div>
        )}
      </div>
      <div className='recommended-events'>
        <h1>We recommend:</h1>
        {recommendedEvents.length === 0 ? (
          <p>No events found. Click Find Events to :&#41;</p>
        ) : (
          <div className='event-card-container'>
            {recommendedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={false}
                enrolledEvents={enrolledEvents}
                handleEnroll={() => handleEnroll(event._id)}
                handleDeleteEvent={null}
                handleEditEvent={null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}