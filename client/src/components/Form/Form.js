import React, { useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createPost } from "../../actions/posts";
import "./FormStyles.css";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Paper,
  Container,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import Alert from "@material-ui/lab/Alert";
//intilizing the filds for the databse
const Form = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    eventName: "",
    eventDescription: "",
    eventImage: "",
    themes: [],
    eventDate: "",
    eventPrice: "",
    eventLocation: "",
    spots: null,
  });
  const [isEventCreated, setIsEventCreated] = useState(false); // State for displaying the success message
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
    await dispatch(createPost(postData));
    setIsEventCreated(true);
    setPostData({
      creator: "",
      eventName: "",
      eventDescription: "",
      eventImage: "",
      themes: [],
      eventDate: "",
      eventPrice: "",
      eventLocation: "",
      spots: 0,
    });

    setTimeout(() => {
      setIsEventCreated(false);
    }, 2000);
  };

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
          Create Event
        </Typography>
        <input
          name="creator"
          type="text"
          className="input"
          placeholder="Enter your name"
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
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
                name="theme-music"
                value="Music"
                checked={postData.themes.includes("Music")}
                onChange={(e) => handleThemeChange(e, "Music")}
              />
            }
            label="Music"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="theme-groupoutings"
                value="Group Outings"
                checked={postData.themes.includes("Group Outings")}
                onChange={(e) => handleThemeChange(e, "Group Outings")}
              />
            }
            label="Group Outings"
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
                name="theme-education"
                value="Education"
                checked={postData.themes.includes("Education")}
                onChange={(e) => handleThemeChange(e, "Education")}
              />
            }
            label="Education"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="theme-culture"
                value="Culture"
                checked={postData.themes.includes("Culture")}
                onChange={(e) => handleThemeChange(e, "Culture")}
              />
            }
            label="Culture"
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
        <input
          name="eventLocation"
          type="text"
          className="input"
          placeholder="Enter event location"
          value={postData.eventLocation}
          onChange={(e) => setPostData({ ...postData, eventLocation: e.target.value })}
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
    </Container>
  );
};
export default Form;
