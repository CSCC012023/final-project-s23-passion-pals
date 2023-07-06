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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import FileBase from "react-file-base64";

const Form = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    eventName: "",
    eventDescription: "",
    eventImage: "",
    theme: "",
    eventDate: "",
    eventPrice: "",
    eventLocation: "",
    spots: 0,
  });
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };

  return (
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
        onChange={(e) =>
          setPostData({ ...postData, creator: e.target.value })
        }
      />
      <input
        name="eventName"
        type="text"
        className="input"
        placeholder="Enter event title"
        value={postData.eventName}
        onChange={(e) =>
          setPostData({ ...postData, eventName: e.target.value })
        }
      />
      <input
        name="eventDescription"
        className="textarea"
        placeholder="Enter event description"
        value={postData.eventDescription}
        onChange={(e) =>
          setPostData({ ...postData, eventDescription: e.target.value })
        }
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Select Event Theme</InputLabel>
        <Select
          name="theme"
          value={postData.theme}
          onChange={(e) => setPostData({ ...postData, theme: e.target.value })}
          className="select"
        >
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Art">Art</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </Select>
      </FormControl>
      <input
        type="date"
        id="eventDate"
        value={postData.eventDate}
        onChange={(e) =>
          setPostData({ ...postData, eventDate: e.target.value })
        }
      />
      <input
        name="eventPrice"
        type="text"
        className="input"
        placeholder="Enter event price"
        value={postData.eventPrice}
        onChange={(e) =>
          setPostData({ ...postData, eventPrice: e.target.value })
        }
      />
      <input
        name="eventLocation"
        type="text"
        className="input"
        placeholder="Enter event location"
        value={postData.eventLocation}
        onChange={(e) =>
          setPostData({ ...postData, eventLocation: e.target.value })
        }
      />
      <input
        name="spots"
        type="number"
        className="input"
        placeholder="Enter available spots"
        value={postData.spots}
        onChange={(e) =>
          setPostData({ ...postData, spots: e.target.value })
        }
      />
      <div className="file-input">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, eventImage: base64 })
          }
        />
      </div>
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
  );
};

export default Form;
