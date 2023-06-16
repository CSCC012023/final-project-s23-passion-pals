import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./loginSignup.css";

function Signup() {
  const signInHistory = useNavigate();
  const loginHistory = useNavigate();

  const [emailSignup, setSignupEmail] = useState("");
  const [passwordSignup, setSignupPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isRegistrationActive, setIsRegistrationActive] = useState(true);

  const [emailLogin, setLoginEmail] = useState("");
  const [passwordLogin, setLoginPassword] = useState("");

  const handleRegClick = (event) => {
    setIsRegistrationActive(false);
  };

  const handleSignClick = (event) => {
    setIsRegistrationActive(true);
  };

  async function submitSignup(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
     email: emailSignup,
     password: passwordSignup,
     fname,
     lname,
    });


      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data.status === "notexist") {
        const userId = response.data.userId;
        localStorage.setItem("userId", userId);
        signInHistory("/dash", { state: { id: userId } });
      } else if (response.data === "emptyPassword") {
        alert("Fields cannot be empty");
      } else if (response.data === "wrongFormat") {
        alert("Invalid email: Please enter a valid Gmail address.");
      }
    } catch (error) {
      alert("Wrong details");
      console.log(error);
    }
  }

  async function submitLogin(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/", {
        email: emailLogin,
        password: passwordLogin,
      });
  
      if (response.data.status === "exist") {
        const userId = response.data.userId;
        localStorage.setItem("userId", userId);
        console.log(localStorage);
        loginHistory("/dash", { state: { id: userId } });
      } else if (response.data === "notexist") {
        alert("Please check your email or password");
      }
    } catch (error) {
      alert("An error occurred while logging in");
      console.log(error);
    }
  }
  

  return (
    <div
      className={`container ${
        isRegistrationActive ? "" : "right-panel-active"
      }`}
      id="container"
    >
      <div className="form-container register-container">
        <form action="#">
          <h1>Register Here!</h1>
          <input
            type="fname"
            placeholder="First Name"
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <input
            type="lname"
            placeholder="Last Name"
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setSignupEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setSignupPassword(e.target.value);
            }}
          />
          <button onClick={submitSignup}>Register</button>
          {}
        </form>
      </div>

      <div className="form-container login-container">
        <form action="#">
          <h1>
            Welcome! <br /> Login
          </h1>
          <input
            type="email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            placeholder="Password"
          />
          {}
          <button onClick={submitLogin}>Login</button>
          {}
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="title">
              insert cheesy
              <br />
              text
            </h1>
            <p>something about the power of friendship</p>
            <button className="ghost" id="login" onClick={handleSignClick}>
              Login
              {}
              <i className="left arrow login">&larr;</i>
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="title">
              Take chances
              <br />
              make mistakes
            </h1>
            <p>get messy</p>
            <button className="ghost" id="register" onClick={handleRegClick}>
              Register
              <i className="right arrow register">&rarr;</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
