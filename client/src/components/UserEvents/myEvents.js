import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CheckBox from '../checkbox';
import EventCard from '../EventCard/eventCard';
import Popup from '../EventCard/eventPopup';
import Form from '../Form/Form';
import '../EventCard/eventCard.css';

const MyEvents = () => {
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const userId = localStorage.getItem('userId');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
// Function to delete the conversation associated with the event
const deleteConversation = async (eventId) => {
    try {
      const conversationResponse = await axios.delete(`http://localhost:5000/deleteConversation/${eventId}`);
      console.log('Conversation deleted:', conversationResponse.data);
    } catch (error) {
      console.log('Error deleting conversation:', error);
    }
  };
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


  
  return (
    <div className="event-card-container">
      {userEvents.map(event => (
        <EventCard key={event._id} event={event} onEdit={true} handleDeleteEvent={handleDeleteEvent} handleEditEvent={() => handleOpenEditForm(event)} />
      ))}
      <Popup isOpen={openEditForm} onClose={() => setOpenEditForm(false)}>
        <Form event={selectedEvent} />
      </Popup>
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
