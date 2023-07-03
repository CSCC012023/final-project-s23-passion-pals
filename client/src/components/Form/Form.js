import React, { useState } from "react";
import useStyles from './styles'
import { useDispatch } from "react-redux";
import axios from 'axios';
import { createPost } from "../../actions/posts";
import "./FormStyles.css"
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
    title: "",
    message: "",
    selectedFile: "",
    theme: "",
  });
  const classes =  useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };

  return (
    
  
        <form autoComplete="off" noValidate onSubmit={handleSubmit} className="form">
          <Typography variant="h3" className="heading">Create Event</Typography>
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
            name="title"
            type="text"
            className="input"
            placeholder="Enter event title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <textarea
            name="message"
            className="textarea"
            placeholder="Enter event description"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
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
          <div className="file-input">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className="submit-button"
            variant="contained"
            color="secondary"
            type="submit"
            style={{ borderRadius: '40px', padding: '1px 1px', minWidth: '10px', display: 'flex', alignItems: 'center', width: '450px', height: '50px'}}
          >
            Submit
          </Button>
        </form>
   
  

  );
};

export default Form;