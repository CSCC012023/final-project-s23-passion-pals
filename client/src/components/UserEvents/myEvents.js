import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CheckBox from '../checkbox';
import '../EventCard/eventCard.css';

const MyEvents = () => {
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
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

  const handleDeleteEvent = (eventId) => {
    // Make a DELETE request to the server to remove the event from the database
    axios
      .delete(`http://localhost:5000/deleteEvent/${eventId}`)
      .then(() => {
        // If the delete request is successful, remove the event from the userEvents state
        setUserEvents((prevUserEvents) => prevUserEvents.filter((event) => event._id !== eventId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="event-card-container">

      {userEvents.map(event => (
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
                  event.eventRegion + " " +
                  event.eventCountry}
              </span>
              <span className="event-price event-body-bottom-text subtle-styled-text float-right">
                {event.eventPrice.startsWith("$") ? event.eventPrice : `$${event.eventPrice}`}
              </span>

            </div>
            <div className="event-body-bottom event-body-bottom-reveal">
              <span className="event-theme event-body-bottom-text subtle-styled-text">{event.themes ? event.themes.map(theme => `#${theme}`).join(' ') : ""}</span>
              <div>
                {/* {event.eventLink !== "" && (
                  <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt" style={{ marginLeft: '0.5rem' }}></i>
                  </a>
                )} */}
                <button className="delete-button" onClick={() => handleDeleteEvent(event._id)}>
                  Delete Event <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

//   return (
//     <div>
//       <h2>My Events</h2>
//       {userEvents.length === 0 ? (
//         <p>You haven't created any events yet!.</p>
//       ) : (
//         <ul>
//           {userEvents.map((event) => (
//             <li key={event._id}>
//               {/* Render event details here */}
//               <p>Event Name: {event.eventName}</p>
//               <p>Event Creator: {event.eventCreator}</p>
//               {event.eventLink !== "" && (
//                 <p>
//                   Event Link:{" "}
//                   <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
//                     {event.eventLink}
//                   </a>
//                 </p>
//               )}

//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

export default MyEvents;
