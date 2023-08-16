import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import InterestModal from '../interestSelection/interestPopup';
import Modal from './locationModal'
import EventCard from '../EventCard/eventCard';
import Popup from '../EventCard/eventPopup';
import Form from '../Form/Form';

/**
 * Profile component to display user profile details.
 * Fetches user data from the server and renders the profile information.
 * Allows users to edit their profile and manage subscriptions.
 */
export default function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterestsModalOpen, setIsInterestsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [themes, setThemes] = useState([]);
  const [userEmail, setEmail] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenEditForm = (event) => {
    setSelectedEvent(event);
    setOpenEditForm(true);
  };

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

  const [isError, setIsError] = useState(false); // State for error handling

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


  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`) // Use the updated route with the user ID
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleSubmit = async () => {

    try {
      // Update the user's locations array
      console.log(selectedLocation)
      if (selectedLocation && !user.locations.includes(selectedLocation)) {
        await axios.post(`http://localhost:5000/addLocation/${userId}`, {
          location: selectedLocation,
        });
        console.log('Location added successfully');
        setSelectedLocation('')
        setUser((prevUser) => ({
          ...prevUser,
          locations: [...prevUser.locations, selectedLocation],
        }));
      } else {
        setIsError(true);
        console.log('error')
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError]);

  useEffect(() => {
    // Only call the handleSubmit function when selectedLocation is not empty
    if (selectedLocation.length) {
      handleSubmit();
    }
  }, [selectedLocation]);

  const handleDeleteEvent = (eventId) => {
    // Make a DELETE request to the server to remove the event from the database
    axios
      .delete(`http://localhost:5000/deleteEvent/${eventId}`)
      .then(async () => {
        // If the delete request is successful, remove the event from the userEvents state
        setUserEvents((prevUserEvents) => prevUserEvents.filter((event) => event._id !== eventId));


        await deleteConversation(eventId);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const deleteConversation = async (eventId) => {
    try {
      const conversationResponse = await axios.delete(`http://localhost:5000/deleteConversation/${eventId}`);
      console.log('Conversation deleted:', conversationResponse.data);
    } catch (error) {
      console.log('Error deleting conversation:', error);
    }
  };

  const handleDeleteLocation = async (locationIndex) => {
    try {
      // Make a DELETE request to the server to remove the location from the user's profile
      const response = await axios.delete(`http://localhost:5000/removeLocation/${userId}`, {
        data: {
          locationIndex: locationIndex
        }
      });

      // Check the response status and update the user's locations if successful
      if (response.status === 200) {
        setUser((prevUser) => {
          const updatedUser = { ...prevUser };
          updatedUser.locations.splice(locationIndex, 1);
          return updatedUser;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    if (user.locations.length > 0) {
      setIsModalOpen(false);
    }
  };

  const handleCloseInterestsModal = () => {
    setIsInterestsModalOpen(false);
  };

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
    <div>
      <div className="header-container">
        <div className="profile-container">
          <div className="profile">
            <div className="profile-picture">
              {/* Use the profile picture data from the server */}
              {user && user.profilePic && (
                <img src={`data:image/jpeg;base64,${user.profilePic}`} alt="Profile" />
              )}
            </div>

            <div className="profile-details">
              {user && (
                <>
                  <h2>{user.fname} {user.lname}</h2>
                  <p className="email">{user.email}</p>
                  <div className="button-container">
                    <div className="hover-container">
                      <Link to="/updateProfile" className="edit-button">
                        <div className="icon-container">
                          <i className="fas fa-user-edit"></i>
                          <span className="icon-text">Edit Profile</span>
                        </div>
                      </Link>
                    </div>
                    <div className="hover-container">
                      <button onClick={() => setIsInterestsModalOpen(true)} className="edit-button">
                        <div className="icon-container">
                          <i className='bx bxs-edit-alt'></i>
                          <span className="icon-text">Edit Themes</span>
                        </div>
                      </button>
                    </div>
                    <div className="hover-container">
                      <button onClick={() => setIsModalOpen(true)} className='edit-button'>
                        <div className="icon-container">
                          <i className='bx bxs-edit-location'></i>
                          <span className="icon-text">Edit Location</span>
                        </div>
                      </button>
                    </div>
                    {/* Render the modal */}
                    <Modal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      onSave={(location, e) => {
                        e.preventDefault();
                        setSelectedLocation(location);
                      }}
                      onDelete={handleDeleteLocation}
                      user={user}
                    />
                    <InterestModal
                      isOpen={isInterestsModalOpen}
                      onClose={handleCloseInterestsModal}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>


      </div>
      <div className='card-container-wrapper'>
        <div className='card-container'>
          <h1>Enrolled Events</h1>
          <br />
          {events.length === 0 ? (
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold' }}>You're not enrolled in any events!</h4>
              <Link to='/findEvent' style={{ color: 'white' }}>Find Events</Link>
            </div>
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
        <div className="card-container">
          <h1>Created Events</h1>
          <div className='event-card-container'>
            {userEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={true}
                enrolledEvents={enrolledEvents}
                handleEnroll={() => handleEnroll(event._id)}
                handleDeleteEvent={() => handleDeleteEvent(event._id)}
                handleEditEvent={() => handleOpenEditForm(event)}
              />
            ))}
            <Popup isOpen={openEditForm} onClose={() => setOpenEditForm(false)} className="anotherclass">
              <Form event={selectedEvent} />
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}