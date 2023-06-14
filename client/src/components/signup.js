import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Signup() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    async function submit(e) {
        e.preventDefault();
      
        try {
          const response = await axios.post("http://localhost:5000/signup", {
            email,
            password,
            fname,
            lname
          });
      
          if (response.data === "exist") {
            alert("User already exists");
          } else if (response.data.status === "notexist") {
            const userId = response.data.userId;
            localStorage.setItem("userId", userId);
            history("/dash", { state: { id: userId } });
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
      


    return (
        <div className="signup">

            <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="fname" onChange={(e) => { setFname(e.target.value) }} placeholder="First Name" />
                <input type="lname" onChange={(e) => { setLname(e.target.value) }} placeholder="Last Name" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Signup