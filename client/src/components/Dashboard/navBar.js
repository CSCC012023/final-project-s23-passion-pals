import React from 'react';
import { Link } from 'react-router-dom';
import "./navBar.css"
import uoft from '../../images/uoft.png';

export default function Navbar() {
    const logOut = async () => { 
        window.localStorage.clear();
        
        window.localStorage.setItem("loggedIn", "false");
    
        window.location.href = "/signup";
    }

    return (
        <nav className="nav">
            {/* Site logo and title */}
            <Link to="/dash" className="site-title">
                <img src={uoft} alt="Site Logo" style={{ width: '62px', height: '62px' }} />
                Passion Pals
            </Link>
            <ul>
                <li>
                    {/* Profile link */}
                    <Link to="/profile" className='link-style'>Profile</Link>
                </li>
                <li>
                    {/* Create Event link */}
                    <Link to="/createEvent" className='link-style'>Create Event</Link>
                </li>
                <li>
                    {/* Find Events link */}
                    <Link to="/findEvent" className='link-style'>Find Events</Link>
                </li>
                <li>
                    {/* Messenger link */}
                    <Link to="/messenger" className='link-style'>Chat</Link>
                </li>
                <li>
                    {/* Logout link */}
                    <Link onClick={logOut} className='link-style'>
                        <i className='bx bx-log-out'></i>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
