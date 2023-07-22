import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { State } from "country-state-city";
import CheckBox from '../checkbox';
import './eventCard.css';

export default function EventCard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3; // set to 3 for demo purposes
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [filters, setFilters] = useState({
    themes: []
  });
  const [filteredData, setFilteredData] = useState([]);
  const [preferredLocations, setPreferredLocations] = useState([]);

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

  // Function to filter events based on the search query
  const filterEvents = (eventsArray, searchQuery) => {
    return eventsArray.filter(
      (item) =>
      ((item.eventName && item.eventName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.eventCity && item.eventCity.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.eventCountry && item.eventCountry.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.eventRegion && item.eventRegion.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  };

  // Filter events based on the search query and update the filteredData state
  useEffect(() => {
    const filteredData = filterEvents(events, query);
    setFilteredData(filteredData);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    // Update the 'filteredData' state based on the search query
    setCurrentPage(0); // Reset the current page to the first page when the search query changes
  }, [events, query]);

  const userId = localStorage.getItem('userId');

  // Get all events that the user is enrolled in
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then(response => {
        const user = response.data;
        if (user) {
          setEnrolledEvents(user.enrolledEvents);
          setPreferredLocations(user.locations);
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

  const [isUserLocationFilterOn, setIsUserLocationFilterOn] = useState(false);

  const handleToggleUserLocationFilter = () => {
    setIsUserLocationFilterOn((prev) => !prev);
    if (!isUserLocationFilterOn) {
      // Filter events based on user's preferred locations when the toggle is turned on
      filterEventsByUserLocation();
    } else {
      // Show all events when the toggle is turned off
      setFilteredData(events);
      setTotalPages(Math.ceil(events.length / itemsPerPage));
      setCurrentPage(0);
    }
  };

  const filterEventsByUserLocation = () => {
    if (preferredLocations) {
      // Parse the user's preferred locations from local storage
      const locationObjects = preferredLocations.map(location => {
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
      const filteredData = events.filter((event) => {
        // Check if the event matches any of the locationObjects
        return locationObjects.some(locationObject => {
          return (
            ((event.eventCountry && event.eventCountry.toLowerCase() === locationObject.eventCountry.toLowerCase()) &&
              (event.eventRegion && event.eventRegion.toLowerCase() === locationObject.eventRegion.toLowerCase()) &&
              (event.eventCity && event.eventCity.toLowerCase() === locationObject.eventCity.toLowerCase())) ||

            ((event.eventCountry && event.eventCountry.toLowerCase() === locationObject.eventCountry.toLowerCase()) &&
              (event.eventRegion && event.eventRegion.toLowerCase() === locationObject.eventRegion.toLowerCase()) &&
              (event.eventCity === "")) ||

            ((event.eventCountry && event.eventCountry.toLowerCase() === locationObject.eventCountry.toLowerCase()) &&
              (event.eventRegion === "") &&
              (event.eventCity === ""))
          );
        });
      });

      setFilteredData(filteredData);
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
      setCurrentPage(0);
    }
  };


  // Pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  // Show all events displayed as cards. Each card has an image, name, location, date, price, description, spots, and a button to enroll or unenroll from the event
  // Cards generated from data in the database
  return (
    <div className="event-card-container">
      <div className="filter-and-search-container">
        <input
          type="text"
          className="search_input"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <CheckBox handleFilters={selectedFilters => handleFilters(selectedFilters, 'themes')} />

        {/* Toggle button for user's preferred locations */}
        <button onClick={handleToggleUserLocationFilter} className='toggle-button'>
          {isUserLocationFilterOn ? 'Show All Events' : 'Filter by Preferred Locations'}
        </button>

      </div>
      {currentEvents.map(event => (
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
              {enrolledEvents.includes(event._id) ? (
                <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)}>Unenroll</button>
              ) : (
                <button className="event-body-bottom-text float-right event-button" onClick={() => handleEnroll(event._id)} disabled={event.spots <= 0}>Enroll Now</button>
              )}
            </div>
          </div>
        </div>
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