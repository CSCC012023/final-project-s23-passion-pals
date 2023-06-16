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
        emailSignup,
        passwordSignup,
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
        alert("Email and password cannot be empty");
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
        emailLogin,
        passwordLogin,
      });

      if (response.data.status === "exist") {
        const userId = response.data.userId;

        localStorage.setItem("userId", userId);
        console.log(localStorage);
        loginHistory("/dash", { state: { id: emailLogin } });
      } else if (response.data === "notexist") {
        alert("Please check your email or password");
      }
    } catch (error) {
      alert("wrong details");
      console.log(error);
    }
  }

  return (
    // <div className="signup">

    //     <h1>Signup</h1>

    //     <form action="POST">
    //         <input type="email" onChange={(e) => { setSignupEmail(e.target.value) }} placeholder="Email"  />
    //         <input type="password" onChange={(e) => { setSignupPassword(e.target.value) }} placeholder="Password" />
    //         <input type="fname" onChange={(e) => { setFname(e.target.value) }} placeholder="First Name" />
    //         <input type="lname" onChange={(e) => { setLname(e.target.value) }} placeholder="Last Name" />
    //         <input type="submit" onClick={submit} />

    //     </form>

    //     <br />
    //     <p>OR</p>
    //     <br />

    //     <Link to="/">Login Page</Link>

    // </div>
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
          {/* <span>or use your account</span>
              <div className="social-container">
                <a href="#" className="social"><i className="lni lni-facebook-fill"></i></a>
                <a href="#" className="social"><i className="lni lni-google"></i></a>
                <a href="#" className="social"
                  ><i className="lni lni-linkedin-original"></i>
                </a>
              </div> */}
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
          {/* <div className="content">
                <div className="checkbox">
                  <input type="checkbox" name="checkbox" id="checkbox" />
                  <label>Remember me</label>
                </div>
                <div className="pass-link">
                  <a href="#">Forgot password?</a>
                </div>
              </div> */}
          <button onClick={submitLogin}>Login</button>
          {/* <span>or use your account</span>
              <div className="social-container">
                <a href="#" className="social"><i className="lni lni-facebook-fill"></i></a>
                <a href="#" className="social"><i className="lni lni-google"></i></a>
                <a href="#" className="social"
                  ><i className="lni lni-linkedin-original"></i
                ></a>
              </div> */}
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
              {/* <!-- below is an icon from an icon library. its in the head--> */}
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
