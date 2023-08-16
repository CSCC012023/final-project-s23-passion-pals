import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./loginSignup.css";
//In the above code, we have defined the Signup component which is responsible for handling user registration and login functionality. It consists of a form with input fields for first name, 
//last name, email, and password. The form submission is handled by the 
function Signup() {

    const signInHistory = useNavigate();
    const loginHistory = useNavigate();
    const [isLoading, setLoading] = useState(false);
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
        setLoading(true);
        const response = await axios.post("/signup", {
          email: emailSignup,
          password: passwordSignup,
          fname,
          lname,
        });
  
        // Handle different response scenarios
        if (response.data === "exist") {
          alert("User already exists");
        } else if (response.data.status === "notexist") {
            alert("Successfully Created an account, email was sent please verify your account to login");
            setSignupEmail("");
            setSignupPassword("");
            setFname("");
            setLname("");
            setLoading(false); 
            // Navigate to the login page
            handleSignClick();
        } else if (response.data === "emptyPassword") {
          alert("Email and password cannot be empty");
        } else if (response.data === "wrongFormat") {
          alert("Invalid email: Please enter a valid Gmail address.");
        }
      } catch (error) {
        alert("Wrong details");
        console.log(error);
      } 
    }
  
    // Function to handle the form submission for user login
    async function submitLogin(e) {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:5000/", {
          email: emailLogin,
          password: passwordLogin,
        });
  
          // Handle different response scenarios
      if (response.data.status === "exist") {
          const userId = response.data.userId;
          const initialized = response.data.userInit;
          localStorage.setItem("userId", userId);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("email", emailLogin);
          console.log(response);
        if(initialized === true) {
          loginHistory("/dash", { state: { id: userId } });
        }
        else {
          loginHistory("/pfp", { state: { id: userId } });
        }
      } else if (response.data.status === "notexist") {
        alert("Please check your email or password");
      } else if (response.data.status === "notverified") {
        alert("Account not verified. Please check your email for the verification link.");
       
      }
    } catch (error) {
      alert("An error occurred while logging in");
      console.log(error);
    }
  }


  return (
    <div className="loginSignup">
      <div
        className={`container ${isRegistrationActive ? "" : "right-panel-active"
          }`}
        id="container"
      >
        <div className="form-container register-container">
          <form action="#">
            <h1>Register Here!</h1>
            <input
              type="fname"
              placeholder="First Name"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
            <input
              type="lname"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={emailSignup}
              onChange={(e) => {
                setSignupEmail(e.target.value);
              }}
            />
          
            <input
              type="password"
              placeholder="Password"
              value={passwordSignup}
              onChange={(e) => {
                setSignupPassword(e.target.value);
              }}
            />
            <button onClick={submitSignup} disabled={isLoading} className={isLoading ? "disabled-button" : ""}>Register</button>
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
            { }
            <button onClick={submitLogin}>Login</button>
            { }
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
                { }
                <i className="left arrow login">&larr;</i>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">
                Take chances
                <br />
                make mistakes
              </h1>
              <p></p>
              <button className="ghost" id="register" onClick={handleRegClick}>
                Register
                <i className="right arrow register">&rarr;</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;