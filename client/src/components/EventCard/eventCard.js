import React, { useEffect, useState } from 'react';
import Popup from './eventPopup';

export default function EventCard({ event, onEdit, enrolledEvents, handleEnroll, handleDeleteEvent, handleEditEvent }) {
    const [openPopups, setOpenPopups] = useState({});
    const userId = localStorage.getItem('userId');

const handleOpenPopup = (eventId) => {
    setOpenPopups(prevOpenPopups => ({
      ...prevOpenPopups,
      [eventId]: true
    }));
  };

  const handleClosePopup = (eventId) => {
    setOpenPopups(prevOpenPopups => ({
      ...prevOpenPopups,
      [eventId]: false
    }));
  };


    return (
        <div key={event._id} className="event-card">
          <div className="event-image-container">
            <div className="event-image" style={{ backgroundImage: `url(${event.eventImage})` }}></div>
          </div>
          <div className="event-body">
            <div className="event-body-top">
              <span className="event-date subtle-styled-text">{new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="event-spots subtle-styled-text float-right">{event.spots} spots left</span>
            </div>
            <div className="event-body-middle" onClick={() => handleOpenPopup(event._id)}>
              <span className="event-name">{event.eventName}</span>
              <br></br>
              <span className="event-description">{event.eventDescription}</span>
            </div>
            <Popup isOpen={openPopups[event._id]} onClose={() => handleClosePopup(event._id)}>
              <p>{event.eventDescription}</p>
            </Popup>
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
              { onEdit ? 
                <div className="modify-event-buttons">
                    <button className="event-body-bottom-text float-right event-button" onClick={() => handleEditEvent(event._id)}>Edit</button>
                    <button className="event-body-bottom-text float-right event-button" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                </div>
                : (enrolledEvents.includes(event._id) ?
                    <button className="event-body-bottom-text float-right event-button" onClick={handleEnroll}>Unenroll</button>
                    : (event.spots > 0 ? (
                    <button className="event-body-bottom-text float-right event-button" onClick={handleEnroll} disabled={event.spots <= 0}>Enroll Now</button>
                    ) : (<span className="event-body-bottom-text float-right">No Spots Available</span>
                    )))
              }
            </div>
          </div>
        </div>
    );
}