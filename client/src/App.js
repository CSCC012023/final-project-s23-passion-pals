import React, { useEffect } from "react";
import { Container, Typography, Grow, Grid } from "@material-ui/core";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// It imports necessary dependencies from React and React Router. The component uses the useLocation hook to get the current location 
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
import Navbar from "./components/Dashboard/navBar";
import Select from './components/interestSelection/selectInterest'
import SelectEdition from './components/interestSelection/selectEdit'
import MyEvents from "./components/UserEvents/myEvents";





const App = () => {
//Determines whether to exclude the Navbar component from rendering based on the current path. The component sets up the routes using the
  const location = useLocation();
  const exclude = location.pathname === '/signup' || location.pathname === '/' || location.pathname === '/select' || location.pathname === '/selectEdit'
//  Routes and Route components from React Router. Each Route is mapped to a specific path and corresponding component. The component renders the 
//  Navbar component if it is not excluded, and the appropriate component based on the current route.
  return (
    <div>
      {!exclude && <Navbar />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/select" element={<Select />} />
        <Route path="/selectEdit" element={<SelectEdition />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createEvent" element={<Form />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/eventCard" element={<EventCard />} />
        <Route path="/myEvents" element={<MyEvents />} />
      </Routes>
    </div>
  );
};
export default App;
