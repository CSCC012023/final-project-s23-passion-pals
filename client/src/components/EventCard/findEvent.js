import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CheckBox from '../checkbox';
import EventCard from './eventCard';
import './findEvent.css';
import io from 'socket.io-client';
import PopupNotification from '../Dashboard/PopupNotification';
import RequestModal from '../Friend/requestPopup.js';


export default function FindEvent() {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage) : 0; // get stored page or default to 0
  });
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6; // set to 3 for demo purposes
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
  const [themes, setThemes] = useState([]);
  const userId = localStorage.getItem('userId');
  const [isUserLocationFilterOn, setIsUserLocationFilterOn] = useState(false);
  const [isFriendFilterOn, setIsFriendFilterOn] = useState(false);
  const [isRecommendedOn, setisRecommendedOn] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  // Get various data about the user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then(response => {
        const user = response.data;
        if (user) {
          setEnrolledEvents(user.enrolledEvents);
          setPreferredLocations(user.locations);
          setFriends(user.friend);
          setThemes(user.interest);
          if (response.data.request && response.data.request.length > 0) {
            setShowNotification(true);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

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
    if (query.length > 0) {
      setisRecommendedOn(false);
      setIsFriendFilterOn(false);
      setIsUserLocationFilterOn(false);
    }
    const filteredData = filterEvents(events, query);
    setFilteredData(filteredData);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    // Update the 'filteredData' state based on the search query
    if (query.length > 0) {
      setIsFilterChange(true);
      setisRecommendedOn(false);
      setIsFriendFilterOn(false);
      setIsUserLocationFilterOn(false);
    }
    //two ifs at different spots to make sure the events happen in the correct sequence
  }, [events, query]);



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

  // Listen for enrolledEventsUpdate event
  useEffect(() => {
    // Listen for 'enrolledEventsUpdate' event
    socket.on('enrolledEventsUpdate', handleEnrolledEventsUpdate);

    // Clean up the socket connection
    return () => {
      socket.off('enrolledEventsUpdate', handleEnrolledEventsUpdate);
    };
  }, []);

  const handleEnrolledEventsUpdate = (data) => {
    if (data.userId === userId) {
      setEnrolledEvents(data.enrolledEvents);
    }
  };

  // Listen for eventUpdate event
  useEffect(() => {
    socket.on('eventUpdate', () => {
      showFilterResults(filters);
    });

    // Clean up the socket connection
    return () => {
      socket.off('eventUpdate');
    };
  }, []);

  const handleToggleUserLocationFilter = () => {
    setIsUserLocationFilterOn((prev) => !prev);
    setQuery('');
    setIsFilterChange(true);
  };

  const handleToggleFriendFilter = () => {
    setIsFriendFilterOn((prev) => !prev);
    setQuery('');
    setIsFilterChange(true);
  };

  const handleToggleRecommendedFilter = () => {
    setisRecommendedOn((prev) => !prev);
    setQuery('');
    setIsFilterChange(true);
  };

  //gets all events friends are enrolled in or created
  useEffect(() => {
    if (friends.length > 0) {
      const promises = friends.map(friendId =>
        axios.get(`http://localhost:5000/getUsers/${friendId}`)
          .catch(error => {
            // Handle individual promise error here (optional)
            console.log(`Error fetching user with ID ${friendId}: ${error}`);
            return null; // Return a resolved promise with null to continue the Promise.all
          })
      );
      Promise.all(promises)
        .then(responses => {
          const friendEvents = responses.map(response => {
            if (response) {
              const user = response.data;
              return user.enrolledEvents;
            }
            return []; // Return an empty array for failed promises
          });

          const friendEmails = responses.map(response => {
            if (response) {
              const user = response.data;
              return user.email;
            }
            return null; // Return null for failed promises
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

      const locationFiltered = events.filter((event) => {
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
        return event.eventCreator !== localStorage.getItem('email');
        {/* && !enrolledEvents.includes(event._id);     excludes user's enrolled events*/ }
      });
      return userFiltered
    }
  };

  useEffect(() => {
    if (query === '') {
      let finalEvents = [];

      if (isRecommendedOn) {
        finalEvents = filterRecommended();
      } else {
        finalEvents = [...events];
      }

      if (isUserLocationFilterOn && preferredLocations.length > 0) {
        finalEvents = filterEventsByLocationObjects(finalEvents, preferredLocations);
      }

      if (isFriendFilterOn && friendEnrolledEvents.length > 0) {
        const friendFilteredEvents = finalEvents.filter((event) =>
          friendEnrolledEvents.some((friendEvent) => event._id === friendEvent._id)
        );
        finalEvents = friendFilteredEvents;
      }
      console.log(finalEvents);

      setFilteredData(finalEvents);
      setTotalPages(Math.ceil(finalEvents.length / itemsPerPage));
    }
  }, [isRecommendedOn, isUserLocationFilterOn, isFriendFilterOn, events, preferredLocations, friendEnrolledEvents]);

  //button stuff for friend request
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  //end of button stuff


  // Enroll or unenroll from an event
  const handleEnroll = (eventId) => {
    if (enrolledEvents.includes(eventId)) {
      // Unenroll from the event
      axios
        .post(`http://localhost:5000/unenroll/${eventId}`, { userId })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Enroll in the event
      axios
        .post(`http://localhost:5000/enroll/${eventId}`, { userId })
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
    <div className='page-container'>
      {showNotification && <PopupNotification handleClick={() => setIsModalOpen(true)} />}
      <div className='under-sidebar'>
        <div className="findEvent-sidebar">

          {/* Toggle button for recommended events */}
          <button onClick={handleToggleRecommendedFilter} className={`toggle-button ${isRecommendedOn ? 'button-on' : 'button-off'}`}>
            Recommended
          </button>

          {/* Toggle button for events user's friends are in */}
          <button onClick={handleToggleFriendFilter} className={`toggle-button ${isFriendFilterOn ? 'button-on' : 'button-off'}`}>
            Your friends are in
          </button>

          {/* Toggle button for user's preferred locations */}
          <button onClick={handleToggleUserLocationFilter} className={`toggle-button ${isUserLocationFilterOn ? 'button-on' : 'button-off'}`}>
            Your locations
          </button>

          <div className="filter-container">
            <span className='filter-label'>Filter by Themes</span>
            <CheckBox handleFilters={selectedFilters => handleFilters(selectedFilters, 'themes')} />
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`popup-button ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}>
          <i class='icon fa-solid fa-user-plus'></i>
          {isHovered && <span className="button-text">Friend Requests</span>}
        </button>
      </div>
      <div className="findEvent-container"> {/*I won't lie this isn't necessary but moving the css breaks the layout so just leave this lol*/}
        <div className="event-card-container">
          <div className="search-container">
            <input
              type="text"
              className="search_input"
              placeholder="Search..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className='event-cards-body'>
            {currentEvents.map(event => (
              // add event card here
              <EventCard key={event._id} event={event} onEdit={false} enrolledEvents={enrolledEvents} handleEnroll={() => handleEnroll(event._id)} handleDeleteEvent={null} handleEditEvent={null} />
            ))}
            {currentEvents.length < itemsPerPage && [...Array(itemsPerPage - currentEvents.length)].map((_, index) => (
              <div key={index} className="event-card" style={{ visibility: 'hidden' }}></div> // ghost element and css should be applied even though event-card isn't in findEvent.css
            ))}
          </div>
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
          {/* Render the modal */}
        </div>
      </div>
      <RequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}