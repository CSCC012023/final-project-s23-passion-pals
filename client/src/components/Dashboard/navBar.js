import React from 'react';
import { Link } from 'react-router-dom';
import "./navBar.css"

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/dash" className="site-title">Passion Pals</Link>
            <ul>
                <li>
                    <Link to="/profile" className='link-style'>Profile</Link>
                </li>
                <li>
                    <Link to="/home" className='link-style'>Create Event</Link>
                </li>
                <li>
                    <Link to="/eventCard" className='link-style'>Find Events</Link>
                </li>
            </ul>
        </nav>
    );
}