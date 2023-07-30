import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Dashboard/navBar";
import Signup from "./components/Signup/signup";
import Dash from "./components/Dashboard/dashBoard";
import Select from "./components/interestSelection/selectInterest";
import SelectEdition from "./components/interestSelection/selectEdit";
import Friend from "./components/Friend/friend";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import FindEvent from "./components/EventCard/findEvent";
import MyEvents from "./components/UserEvents/myEvents";
import ProfilePic from "./components/ProfilePicture/pfp";
import Messenger from "./pages/messenger/Messenger";

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const location = useLocation();
  const exclude =
    location.pathname === "/signup" ||
    location.pathname === "/" ||
    location.pathname === "/select" ||
    location.pathname === "/selectEdit" ||
    location.pathname === "/friend";

  const PrivateRoute = ({ element, path }) => {
    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/signup" replace={true} state={{ from: path }} />
    );
  };

  return (
    <div>
      {!exclude && <Navbar />}
      <Routes>
      <Route
          path="/"
          element={<PrivateRoute element={<Signup />} path="/" />}
        />
        <Route
          path="/dash"
          element={<PrivateRoute element={<Dash />} path="/dash" />}
        />
        <Route
          path="/friend"
          element={<PrivateRoute element={<Friend />} path="/friend" />}
        />
        <Route
          path="/select"
          element={<PrivateRoute element={<Select />} path="/select" />}
        />
        <Route
          path="/selectEdit"
          element={<PrivateRoute element={<SelectEdition />} path="/selectEdit" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/createEvent"
          element={<PrivateRoute element={<Form />} path="/createEvent" />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} path="/profile" />}
        />
        <Route
          path="/updateProfile"
          element={<PrivateRoute element={<UpdateProfile />} path="/updateProfile" />}
        />
        <Route
          path="/findEvent"
          element={<PrivateRoute element={<FindEvent />} path="/findEvent" />}
        />
        <Route
          path="/myEvents"
          element={<PrivateRoute element={<MyEvents />} path="/myEvents" />}
        />
        <Route
          path="/pfp"
          element={<PrivateRoute element={<ProfilePic />} path="/pfp" />}
        />
        <Route
          path="/messenger"
          element={<PrivateRoute element={<Messenger />} path="/messenger" />}
        />
      </Routes>
    </div>
  );
};

export default App;
