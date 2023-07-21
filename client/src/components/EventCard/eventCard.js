import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CheckBox from '../checkbox';
import Popup from './eventPopup';
import './eventCard.css';

export default function EventCard() {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage) : 0; // get stored page or default to 0
  });
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3; // set to 3 for demo purposes
  const [events, setEvents] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [openPopups, setOpenPopups] = useState({});
  const [filters, setFilters] = useState({
    themes: []
  });

  // Save current page to local storage
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('currentPage', currentPage);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPage]);  

  // Get all events
  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then(response => {
        setEvents(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
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
          localStorage.setItem('currentPage', currentPage);
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
          localStorage.setItem('currentPage', currentPage);
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

  // Pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

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

   useEffect(() => {
    console.log(openPopups);
  }, [openPopups]);
  

  // Show all events displayed as cards. Each card has an image, name, location, date, price, description, spots, and a button to enroll or unenroll from the event
  // Cards generated from data in the database
  return (
    <div className="event-card-container">
      <CheckBox handleFilters={selectedFilters => handleFilters(selectedFilters, 'themes')} />
      {currentEvents.map(event => (
        <div key={event._id} className="event-card">
          <div className="event-image-container">
            <div className="event-image" style={{ backgroundImage: `url(${event.eventImage})`}}></div>
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
              <span className="event-location event-body-bottom-text subtle-styled-text">{event.eventLocation}</span>
              <span className="event-price event-body-bottom-text subtle-styled-text float-right">
                {event.eventPrice.startsWith("$") ? event.eventPrice : `$${event.eventPrice}`}
              </span>
            </div>
            <div className="event-body-bottom event-body-bottom-reveal">
              <span className="event-theme event-body-bottom-text subtle-styled-text">{event.themes ? event.themes.map(theme => `#${theme}`).join(' ') : ""}</span>
              { enrolledEvents.includes(event._id) ? 
              <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)}>Unenroll</button> 
              : ( event.spots > 0 ? (
                  <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)} disabled={event.spots <= 0}>Enroll Now</button>
                ) : ( <span className = "event-body-bottom-text float-right">No Spots Available</span>
                ))
              }
            </div>
          </div>
        </div>
      ))}
      {currentEvents.length < itemsPerPage && [...Array(itemsPerPage - currentEvents.length)].map((_, index) => (
        <div key={index} className="event-card" style={{ visibility: 'hidden' }}></div>
      ))}
      <ReactPaginate 
        pageCount={totalPages} 
        onPageChange={({ selected }) => handlePageChange(selected)} 
        forcePage={currentPage}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        containerClassName={'pagination-container'}
        activeClassName={'active-page'}
      />
    </div>
  );
}
