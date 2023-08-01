import React, { useEffect, useState } from 'react';
import Popup from './eventPopup';
import axios from 'axios';
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
  const removeUserFromConversation = async (eventId) => {
    try {
      // Make an API call to find the conversation by eventId
      const response = await axios.get(`/findConversationByEventId/${eventId}`);
      const conversation = response.data;

      if (conversation) {
        // Check if the current user ID is a member of the conversation
        const isUserMember = conversation.members.includes(userId);

        if (isUserMember) {
          // If the current user is a member, remove the user ID from the members array
          const updatedMembers = conversation.members.filter(memberId => memberId !== userId);

          // Make another API call to update the conversation with the new members array
          await axios.put(`/updateConversationMembers/${conversation._id}`, { members: updatedMembers });

          console.log('User removed from conversation successfully');
        } else {
          console.log('User is not a member of the conversation');
        }
      } else {
        console.log('Conversation not found for the event');
      }
    } catch (error) {
      console.log('Error removing user from conversation:', error);
    }
  };

  const addUserToConversation = async (eventId) => {
    try {
      // Make an API call to find the conversation by eventId
      const response = await axios.get(`/findConversationByEventId/${eventId}`);
      const conversation = response.data;

      if (conversation) {
        // Check if the current user ID is already a member of the conversation
        const isUserAlreadyMember = conversation.members.includes(userId);

        if (!isUserAlreadyMember) {
          // If the current user is not a member, add the user ID to the members array
          const updatedConversation = {
            ...conversation,
            members: [...conversation.members, userId] // Assuming `userId` is the current user's ID
          };

          // Make another API call to update the conversation with the new members array
          await axios.put(`/updateConversationMembers/${conversation._id}`, { members: updatedConversation.members });

          console.log('User added to conversation successfully');
        } else {
          console.log('User is already a member of the conversation');
        }
      } else {
        console.log('Conversation not found for the event');
      }
    } catch (error) {
      console.log('Error adding user to conversation:', error);
    }
  };

  // New function to handle unenrollment and remove the user from the conversation
  const handleUnenroll = async (eventId) => {
    await removeUserFromConversation(eventId); // Call the function to remove the user from the conversation
    handleEnroll(); // Call the existing handleEnroll function to unenroll from the event
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
                <button className="event-body-bottom-text float-right event-button" onClick={() => handleUnenroll(event._id)}>Unenroll</button>
                    : (event.spots > 0 ? (
                    <button className="event-body-bottom-text float-right event-button" onClick={() => {
                        handleEnroll();
                        addUserToConversation(event._id); // Call the function here after successful enrollment
                      }}
                      disabled={event.spots <= 0}
                    >Enroll Now</button>
                    ) : (<span className="event-body-bottom-text float-right">No Spots Available</span>
                    )))
              }
            </div>
          </div>
        </div>
    );
}