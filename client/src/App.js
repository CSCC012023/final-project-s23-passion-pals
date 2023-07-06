import React, { useEffect } from "react";
import { Container, Typography, Grow, Grid } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import uoft from "./images/uoft.png";
import useStyles from "./styles";
import Post from "./components/home";
import Login from "./components/login";
import Signup from "./components/Signup/signup";
import Dash from "./components/Dashboard/dashBoard";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import EventCard from "./components/EventCard/eventCard";
import Select from './components/interestSelection/selectInterest'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/select" element={<Select/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Post />} />
      <Route path="/dash" element={<Dash />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/updateProfile" element={<UpdateProfile />} />
      <Route path="/eventCard" element={<EventCard />} />
    </Routes>
  );
};
export default App;
