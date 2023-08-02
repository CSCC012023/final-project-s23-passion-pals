import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CheckBox from '../checkbox';
import EventCard from './eventCard';
import './findEvent.css';
import io from 'socket.io-client';


export default function FindEvent() {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage) : 0; // get stored page or default to 0
  });
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
  const [isFilterChange, setIsFilterChange] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendEnrolledEvents, setFriendEnrolledEvents] = useState([]);

  // Save current page to local storage
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('currentPage', currentPage);
      console.log(localStorage.getItem('currentPage'))
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPage]);

  const socket = io('http://localhost:5000');

  // Get all events that the user is enrolled in
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then(response => {
        const user = response.data;
        if (user) {
          setEnrolledEvents(user.enrolledEvents);
          setPreferredLocations(user.locations);
          setFriends(user.friend);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Get all events
  useEffect(() => {
    axios
      .get('http://localhost:5000/events')
      .then(response => {
        const filtered = response.data.filter((event) => {
          return (event.eventCreator !== localStorage.getItem('email'))
        });
        setEvents(filtered);
        setTotalPages(Math.ceil(events.length / itemsPerPage));
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
    if (query.length > 0) {
      setIsFilterChange(true);
    }
  }, [events, query]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedFilters = localStorage.getItem('filters');
    if (storedFilters) {
      setFilters(JSON.parse(storedFilters));
    }
  }, []);



  // Handle filters
  const handleFilters = (selectedFilters, category) => {
    const newFilters = { ...filters };
    newFilters[category] = selectedFilters;
    setFilters(newFilters);
    setIsFilterChange(true);
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
        const filtered = response.data.filter((event) => {
          return (event.eventCreator !== localStorage.getItem('email'))
        });
        setEvents(filtered);
        setFilteredData(filtered);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Listen for spotUpdate event
  useEffect(() => {
    socket.on('spotUpdate', ({ eventId, spots }) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event._id === eventId) {
            return { ...event, spots };
          }
          return event;
        })
      );
    });

    // Clean up the socket connection
    return () => {
      socket.off('spotUpdate');
    };
  }, []);

  const [isUserLocationFilterOn, setIsUserLocationFilterOn] = useState(false);
  const [isFriendFilterOn, setIsFriendFilterOn] = useState(false);

  const handleToggleUserLocationFilter = () => {
    setIsUserLocationFilterOn((prev) => !prev);
    setIsFilterChange(true);
  };

  const handleToggleFriendFilter = () => {
    setIsFriendFilterOn((prev) => !prev);
    setIsFilterChange(true);
  };
  //gets all events friends are enrolled in or created
  useEffect(() => {
    if (friends.length > 0) {
      const promises = friends.map(friendId =>
        axios.get(`http://localhost:5000/getUsers/${friendId}`)
      );
      Promise.all(promises)
        .then(responses => {
          const friendEvents = responses.map(response => {
            const user = response.data;
            return user.enrolledEvents;
          })
          const friendEmails = responses.map(response => {
            const user = response.data;
            return user.email;
          });
          // Combine all the friend enrolled events into a single array
          const allFriendEvents = friendEvents.flat();
          //Convert eventIds into their details
          const friendEnrolledEventDetails = allFriendEvents.map(eventId => {
            return (events.find(event => event._id === eventId));
          });
          const friendCreatedEvent = friendEmails.map(email => {
            return events.find(event => event.eventCreator === email);
          });
          // Filter out any 'undefined' values from the array and update the original array
          const excludeUndefinedenrol = friendEnrolledEventDetails.filter(event => event !== undefined);
          const excludeUndefinedcreate = friendCreatedEvent.filter(event => event !== undefined);
          const finalReturn = excludeUndefinedenrol.concat(excludeUndefinedcreate);
          setFriendEnrolledEvents([...new Set(finalReturn)]); //remove duplicate elements with Set
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [friends, events]);

  const filterEventsByLocationObjects = (events, preferredLocations) => {
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
    return events.filter((event) => {
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
  };

  const filterEventByFriends = () => {
    const finalEvents = isUserLocationFilterOn
      ? filteredData.filter((event) => friendEnrolledEvents.some(friendEvent => event._id === friendEvent._id))
      : events.filter((event) => friendEnrolledEvents.some(friendEvent => event._id === friendEvent._id));
    return finalEvents;
  };

  useEffect(() => {
    let finalEvents = [];

    if (isUserLocationFilterOn && preferredLocations.length > 0) {
      finalEvents = filterEventsByLocationObjects(events, preferredLocations);
    } else {
      finalEvents = [...events];
    }

    if (isFriendFilterOn && friendEnrolledEvents.length > 0) {
      const friendFilteredEvents = finalEvents.filter((event) =>
        friendEnrolledEvents.some((friendEvent) => event._id === friendEvent._id)
      );
      finalEvents = friendFilteredEvents;
    }

    setFilteredData(finalEvents);
    setTotalPages(Math.ceil(finalEvents.length / itemsPerPage));
    setQuery('');
  }, [isUserLocationFilterOn, isFriendFilterOn, events, preferredLocations, friendEnrolledEvents]);




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
    if (isFilterChange) {
      setCurrentPage(0);
      setIsFilterChange(false);
    }
  }, [isFilterChange]);



  // Pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    localStorage.setItem('currentPage', selectedPage);
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

        <button onClick={handleToggleFriendFilter} className='toggle-button'>
          {isFriendFilterOn ? 'Show All Events' : 'Your friends are in'}
        </button>

      </div>
      {currentEvents.map(event => (
        // add event card here
        <EventCard key={event._id} event={event} onEdit={false} enrolledEvents={enrolledEvents} handleEnroll={() => handleEnroll(event._id)} handleDeleteEvent={null} handleEditEvent={null} />
      ))}
      {currentEvents.length < itemsPerPage && [...Array(itemsPerPage - currentEvents.length)].map((_, index) => (
        <div key={index} className="event-card" style={{ visibility: 'hidden' }}></div> // ghost element and css should be applied even though event-card isn't in findEvent.css
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