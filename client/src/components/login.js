import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/", {
              email,
              password,
            });
            
            if (response.data.status === "exist") {
              const userId = response.data.userId;

              localStorage.setItem("userId", userId);
              console.log(localStorage);
              history("/dash", { state: { id: email } });
            } else if (response.data === "notexist") {
              alert("Please check your email or password");
            }
          } catch (error) {
            alert("wrong details");
            console.log(error);
          }
        }
    


    return (
        <div className="login">

            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Sign up Page</Link>

        </div>
    )
}

export default Login