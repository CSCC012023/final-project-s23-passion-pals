import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createPost } from "../../actions/posts";
import "./FormStyles.css";
import CountrySelector from './countrySelector';

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
const Form = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
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
        creatorPhoneNum: user.phoneNumber,

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
    <div className="form_container">
      <form autoComplete="off" noValidate onSubmit={handleSubmit} className="form">
        <Typography variant="h3" className="heading">
          Create Event
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
          <Typography variant="h7" style={{ color: "white", fontWeight: "bold" }} >
            Select Event Themes
          </Typography>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-gaming"
                  value="Gaming"
                  checked={postData.themes.includes("Gaming")}
                  onChange={(e) => handleThemeChange(e, "Gaming")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Gaming"
              style = {{color: "white"}}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="theme-nature"
                  value="Nature"
                  checked={postData.themes.includes("Nature")}
                  onChange={(e) => handleThemeChange(e, "Nature")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Nature"
              style = {{color: "white"}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-creativity"
                  value="Creativity"
                  checked={postData.themes.includes("Creativity")}
                  onChange={(e) => handleThemeChange(e, "Creativity")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Creativity"
              style = {{color: "white"}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-festivals"
                  value="Festivals"
                  checked={postData.themes.includes("Festivals")}
                  onChange={(e) => handleThemeChange(e, "Festivals")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Festivals"
              style = {{color: "white"}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-sports"
                  value="Sports"
                  checked={postData.themes.includes("Sports")}
                  onChange={(e) => handleThemeChange(e, "Sports")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Sports"
              style = {{color: "white"}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-culinary"
                  value="Culinary"
                  checked={postData.themes.includes("Culinary")}
                  onChange={(e) => handleThemeChange(e, "Culinary")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Culinary"
              style = {{color: "white"}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-adventure"
                  value="Adventure"
                  checked={postData.themes.includes("Adventure")}
                  onChange={(e) => handleThemeChange(e, "Adventure")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Adventure"
              style = {{color: "white"}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="theme-health"
                  value="Health"
                  checked={postData.themes.includes("Health")}
                  onChange={(e) => handleThemeChange(e, "Health")}
                  style={{ color: "#0BC6AB" }}
                />
              }
              label="Health"
              style = {{color: "white"}}
            />
          </div>
        </FormControl>
       {/* Move the Date field to the left */}
       <FormControl fullWidth>
          <Typography variant="h7" style={{ color: "white", fontWeight: "bold" }}>
            Select Event Date
          </Typography>
          <br />
          <input
            type="date"
            id="eventDate"
            value={postData.eventDate}
            onChange={(e) => setPostData({ ...postData, eventDate: e.target.value })}
          />
        </FormControl>
        <br />
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

        <br />
  
        <CountrySelector postData={postData} setPostData={setPostData} />

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
          value={postData.spots}
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
            Event created successfully!
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
    </div>
  );
};
export default Form;
