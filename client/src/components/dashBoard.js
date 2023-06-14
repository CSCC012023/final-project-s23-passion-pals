import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Dash() {




    return (
        <div className="dashBoard">

            <h1>dash board</h1>
        
            <Link to="/profile">Uer Profile page</Link>

           
            <p>OR</p>
           
            <Link to="/home">Event Creation page</Link>
            <p>OR</p>
            <Link to="/eventCard">Event card page</Link>

        </div>
    )
}

export default Dash