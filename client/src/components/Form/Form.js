import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createPost } from "../../actions/posts";
import "./FormStyles.css";
import CountrySelector from './countrySelector';

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Typography,
  Container,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import Alert from "@material-ui/lab/Alert";
import { State } from "country-state-city";
//intilizing the filds for the databse
const Form = (event) => {
  console.log('eventData:', event);
  const eventData = event.hasOwnProperty('event') ? event : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState( {
    name: "",
    eventName: "",
    eventLink: "",
    eventDescription: "",
    eventImage: "",
    themes: [],
    eventDate: "",
    eventPrice: "",
    eventCity: "",
    eventCountry: "",
    eventRegion: "",
    eventAddress: "",
    spots: null,
  });
  useEffect(() => {
    if (eventData) {
      setPostData({
        name: eventData.event.name,
        eventName: eventData.event.eventName,
        eventLink: eventData.event.eventLink,
        eventDescription: eventData.event.eventDescription,
        eventImage: eventData.event.eventImage,
        themes: eventData.event.themes,
        eventDate: eventData.event.eventDate,
        eventPrice: eventData.event.eventPrice,
        eventCity: eventData.event.eventCity,
        eventCountry: eventData.event.eventCountry,
        eventRegion: eventData.event.eventRegion,
        eventAddress: eventData.event.eventAddress,
        spots: eventData.event.spots
      });
    }
  }, [eventData]);
  
  const [isEventCreated, setIsEventCreated] = useState(false); // State for displaying the success message
  const [isError, setIsError] = useState(false); // State for error handling
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUsers/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);


  const classes = useStyles();

  /**
   * Handles the form submission.
   * Dispatches the createPost action with the postData.
   * Sets the isEventCreated state to true to display the success message.
   * Resets the form fields.
   * Removes the success message after 2 seconds.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      postData.name === "" ||
      postData.eventName === "" ||
      postData.eventDescription === "" ||
      postData.eventDate === "" ||
      postData.eventPrice === "" ||
      postData.eventCountry === "" ||
      postData.spots <= 0
    ) {
      setIsError(true);
      console.log(postData.eventCity);
      console.log(postData.eventCountry);
      console.log(postData.eventRegion);
      console.log(State.getStatesOfCountry(postData.eventRegion).length);
      return;
    }

    // Check if user state is available (user data is fetched)
    if (user) {
    // Use user.email as the eventCreator in postData
    const eventPostData = {
        ...postData,
        eventCreator: user.email,
        };

        // Dispatch the createPost action with the updated postData
    const createdPostData = await dispatch(createPost(eventPostData));
    const postId = createdPostData._id;
      // Create the conversation object to be posted
      const conversationObject = {
        members: [userId], // Add the current user's ID to the members array
        event: postData.eventName, // Set the event name as the "event" field
        eventId: postId,
      };
      console.log('User successfully logged in: ', user.email);

      if (eventData) {
        try {
          await axios.patch(`http://localhost:5000/events/${eventData.event._id}`, eventPostData);
          console.log('updated Data:', eventPostData);
          navigate('/myEvents');
        } catch (error) {
          console.log("Error updating event: ", error);
        }
      } else {
        // Dispatch a create action with the postData
        await dispatch(createPost(eventPostData));
      }

      try {
        // Make an HTTP POST request to save the conversation
        const response = await axios.post("http://localhost:5000/createConversation", conversationObject);
        console.log("Conversation created:", response.data);



        setIsEventCreated(true);
        setPostData({
          name: "",
          eventName: "",
          eventLink: "",
          eventDescription: "",
          eventImage: "",
          themes: [],
          eventDate: "",
          eventPrice: "",
          eventAddress: "",
          spots: 0,
        });

        setTimeout(() => {
          setIsEventCreated(false);
        }, 2000);
      } catch (error) {
        console.error("Error creating conversation:", error);
        // Handle error if the conversation creation fails
      }
    } else {
      // If user state is not available, show an error or handle accordingly
      console.log("User data not available");
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

  /**
   * Handles the change event for theme checkboxes.
   * Updates the postData state based on the checked or unchecked theme.
   */
  const handleThemeChange = (e, theme) => {
    if (e.target.checked) {
      setPostData((prevPostData) => ({
        ...prevPostData,
        themes: [...prevPostData.themes, theme],
      }));
    } else {
      setPostData((prevPostData) => ({
        ...prevPostData,
        themes: prevPostData.themes.filter(
          (selectedTheme) => selectedTheme !== theme
        ),
      }));
    }
  };

  return (

    // The provided code snippet represents a form component for creating events. The form includes vario
    // us input fields such as creator name, event name, event description, event date, event price, event location, 
    // and available spots. The user can enter the required information, and upon form submission, the handleSubmit function
    //  is triggered. The function dispatches a createPost action and resets the form fields. Additionally, there are checkboxes for 
    //  selecting event themes, which update the postData state based on the selected themes using the handleThemeChange function. The form is 
    //  styled using Material-UI components and custom CSS classes. The component also includes the necessary imports and utilizes React hooks such as 
    //  useState and useDispatch. Overall, this form provides a user-friendly interface for creating events and handles the necessary data submission.
    <Container component="main">
      <form autoComplete="off" noValidate onSubmit={handleSubmit} className="form">
        <Typography variant="h3" className="heading">
          {eventData ? "Edit Event" : "Create Event"}
        </Typography>
        <input
          name="name"
          type="text"
          className="input"
          placeholder="Enter your name"
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <input
          name="eventName"
          type="text"
          className="input"
          placeholder="Enter event title"
          value={postData.eventName}
          onChange={(e) => setPostData({ ...postData, eventName: e.target.value })}
        />
        <input
          name="eventLink"
          type="text"
          className="input"
          placeholder="Enter event link (optional)"
          value={postData.eventLink}
          onChange={(e) => setPostData({ ...postData, eventLink: e.target.value })}
        />
        <textarea
          name="eventDescription"
          className="textarea"
          placeholder="Enter event description"
          value={postData.eventDescription}
          onChange={(e) => setPostData({ ...postData, eventDescription: e.target.value })}
        />
        <FormControl component="fieldset" fullWidth>
          <Typography>Select Event Themes</Typography>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-gaming"
                  value="Gaming"
                  checked={postData.themes.includes("Gaming")}
                  onChange={(e) => handleThemeChange(e, "Gaming")}
                />
              }
              label="Gaming"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="theme-nature"
                  value="Nature"
                  checked={postData.themes.includes("Nature")}
                  onChange={(e) => handleThemeChange(e, "Nature")}
                />
              }
              label="Nature"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-creativity"
                  value="Creativity"
                  checked={postData.themes.includes("Creativity")}
                  onChange={(e) => handleThemeChange(e, "Creativity")}
                />
              }
              label="Creativity"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-festivals"
                  value="Festivals"
                  checked={postData.themes.includes("Festivals")}
                  onChange={(e) => handleThemeChange(e, "Festivals")}
                />
              }
              label="Festivals"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-sports"
                  value="Sports"
                  checked={postData.themes.includes("Sports")}
                  onChange={(e) => handleThemeChange(e, "Sports")}
                />
              }
              label="Sports"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-culinary"
                  value="Culinary"
                  checked={postData.themes.includes("Culinary")}
                  onChange={(e) => handleThemeChange(e, "Culinary")}
                />
              }
              label="Culinary"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-adventure"
                  value="Adventure"
                  checked={postData.themes.includes("Adventure")}
                  onChange={(e) => handleThemeChange(e, "Adventure")}
                />
              }
              label="Adventure"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-health"
                  value="Health"
                  checked={postData.themes.includes("Health")}
                  onChange={(e) => handleThemeChange(e, "Health")}
                />
              }
              label="Health"
            />
          </div>
        </FormControl>
        <input
          type="date"
          id="eventDate"
          value={postData.eventDate}
          onChange={(e) => setPostData({ ...postData, eventDate: e.target.value })}
        />
        <input
          name="eventPrice"
          type="text"
          className="input"
          placeholder="Enter event price"
          value={postData.eventPrice ? `$${postData.eventPrice}` : ""}
          onChange={(e) =>
            setPostData({ ...postData, eventPrice: e.target.value.replace("$", "") })
          }
        />

        <div>
          <CountrySelector postData={postData} setPostData={setPostData} />
        </div>

        <input
          name="eventAddress"
          type="text"
          className="input"
          placeholder="Enter event address (optional)"
          value={postData.eventAddress}
          onChange={(e) => setPostData({ ...postData, eventAddress: e.target.value })}
        />

        <input
          name="spots"
          type="number"
          className="input"
          placeholder="Enter available spots"
          value={postData ? postData.spots : 0}
          onChange={(e) => setPostData({ ...postData, spots: e.target.value })}
        />
        <div className="file-input">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, eventImage: base64 })}
          />
        </div>
        {isError && (
          <Alert severity="error" className="alert">
            Please fill in all the required fields and ensure the spots value is greater than 0.
          </Alert>
        )}
        {isEventCreated && (
          <Alert severity="success" className="alert">
            {eventData ? "Event Updated!" : "Event created successfully!"}
          </Alert>
        )}
        <Button
          className="submit-button"
          variant="contained"
          color="secondary"
          type="submit"
          style={{
            borderRadius: "40px",
            padding: "1px 1px",
            minWidth: "10px",
            display: "flex",
            alignItems: "center",
            width: "450px",
            height: "50px",
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default Form;