import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// The Login component represents the login page
function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit the login form
  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/", {
        email,
        password,
      });
//The above code defines the Login component, which represents the login page. 
//It imports necessary dependencies from React and Axios, and also imports the useNavigate and Link components from React Router.
      if (response.data.status === "exist") {
        const userId = response.data.userId;

        localStorage.setItem("userId", userId);
        console.log(localStorage);
        history("/dash", { state: { id: email } });
      } else if (response.data === "notexist") {
        alert("Please check your email or password");
      }
    } catch (error) {
      alert("Wrong details");
      console.log(error);
    }
  }
  //The component uses the useState hook to manage the email and password states.
  // It defines an async function submit to handle form submission. The form inputs are controlled using the onChange event handlers. 
  return (
    <div className="login">
      <h1>Login</h1>
      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Sign up Page</Link>
    </div>
  );
}

export default Login;
