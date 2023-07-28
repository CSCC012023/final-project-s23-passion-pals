import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./dashBoard.css";
import { theme } from 'antd';

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
    axios.get(`http://localhost:5000/getUsers/${userId}`)
      .then(response => {
        const user = response.data;
        if (user) {
          setEnrolledEvents(user.enrolledEvents);
          setPreferredLocations(user.locations);
          setThemes(user.interest)
          setEmail(user.email)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  /**
   * Fetches the events based on the enrolled event IDs and also fetches all events for the recommended filter
   */
  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then(response => {
        const filteredEvents = response.data.filter(event => enrolledEvents.includes(event._id));
        setEvents(filteredEvents);
        setAllEvents(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [enrolledEvents]);

  const handleEnroll = (eventId) => {
    if (enrolledEvents.includes(eventId)) {
      // Unenroll from the event
      axios
        .post(`http://localhost:5000/unenroll/${eventId}`, { userId })
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
      axios
        .post(`http://localhost:5000/enroll/${eventId}`, { userId })
        .then(() => {
          setEnrolledEvents(prevEnrolledEvents => [...prevEnrolledEvents, eventId]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    filterRecommended();
  }, [preferredLocations, themes, userEmail, enrolledEvents]);

  //from all events it will pick out everything that matches the users set locations, 
  //then it will pick out everything that doesn't match the users themes
  const filterRecommended = () => {
    if (preferredLocations && themes) {
      // Parse the user's preferred locations from local storage
      const locationObjects = preferredLocations.map(location => {
        const parts = location.split(', ');

        let eventCity = "";
        let eventCountry = "";
        let eventRegion = "";

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
        return locationObjects.some(locationObject => {
          return (
            ((event.eventCountry && event.eventCountry.toLowerCase() === locationObject.eventCountry.toLowerCase()) &&
              (event.eventRegion.toLowerCase() === locationObject.eventRegion.toLowerCase()) &&
              (event.eventCity.toLowerCase() === locationObject.eventCity.toLowerCase()))
          );
        });
      });

      // Filter events based on themes
      const themeFiltered = locationFiltered.filter((event) => {
        return event.themes && event.themes.some((theme) => themes.includes(theme));
      });

      // Filter user's own events and event they have enrolled in
      const userFiltered = themeFiltered.filter((event) => {
        return (event.eventCreator !== userEmail && !enrolledEvents.includes(event._id))
      });
      setRecommended(userFiltered);
    }
  };

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
                  <div className="event-image" style={{ backgroundImage: `url(${event.eventImage})` }}></div>
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
                    <span className="event-location event-body-bottom-text subtle-styled-text">
                      {(event.eventCity ? event.eventCity + ", " : "") +
                        (event.eventRegion ? event.eventRegion + ", " : "") +
                        event.eventCountry}
                    </span>
                    <span className="event-price event-body-bottom-text subtle-styled-text float-right">
                      {event.eventPrice.startsWith("$") ? event.eventPrice : `$${event.eventPrice}`}
                    </span>
                  </div>
                  <div className="event-body-bottom event-body-bottom-reveal">
                    <span className="event-theme event-body-bottom-text subtle-styled-text">{event.themes ? event.themes.map(theme => `#${theme}`).join(' ') : ""}</span>
                    {enrolledEvents.includes(event._id) ?
                      <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)}>Unenroll</button>
                      : (event.spots > 0 ? (
                        <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)} disabled={event.spots <= 0}>Enroll Now</button>
                      ) : (<span className="event-body-bottom-text float-right">No Spots Available</span>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='recommended-events'>
        <h1>
          We recommend:
        </h1>

        {recommendedEvents.length === 0 ? (
          <p>No events found. Click Find Events to :&#41;</p>
        ) : (
          <div className="event-card-container">
            {recommendedEvents.map(event => (
              <div key={event._id} className="event-card">
                <div className="event-image-container">
                  <div className="event-image" style={{ backgroundImage: `url(${event.eventImage})` }}></div>
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
                    <span className="event-location event-body-bottom-text subtle-styled-text">
                      {(event.eventCity ? event.eventCity + ", " : "") +
                        (event.eventRegion ? event.eventRegion + ", " : "") +
                        event.eventCountry}
                    </span>
                    <span className="event-price event-body-bottom-text subtle-styled-text float-right">
                      {event.eventPrice.startsWith("$") ? event.eventPrice : `$${event.eventPrice}`}
                    </span>
                  </div>
                  <div className="event-body-bottom event-body-bottom-reveal">
                    <span className="event-theme event-body-bottom-text subtle-styled-text">{event.themes ? event.themes.map(theme => `#${theme}`).join(' ') : ""}</span>
                    {enrolledEvents.includes(event._id) ?
                      <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)}>Unenroll</button>
                      : (event.spots > 0 ? (
                        <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)} disabled={event.spots <= 0}>Enroll Now</button>
                      ) : (<span className="event-body-bottom-text float-right">No Spots Available</span>
                      ))
                    }
                    {/*FIX ABOVE ENROLL SHIT */}
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

