import React from 'react';
import { Link } from 'react-router-dom';
import "./navBar.css"
import uoft from '../../images/uoft.png';

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/dash" className="site-title">
                <img src={uoft} alt="Site Logo" style={{ width: '62px', height: '62px' }} />
                Passion Pals
            </Link>
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
                <li>
                    <Link to="/signup" className='link-style'>
                        <i className='bx bx-log-out'></i>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}