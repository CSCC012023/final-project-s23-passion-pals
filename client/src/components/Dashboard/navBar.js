import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./navBar.css"
import uoft from '../../images/logo.png';

export default function Navbar() {
    const logOut = async () => {
        window.localStorage.clear();

        window.localStorage.setItem("loggedIn", "false");

        window.location.href = "/signup";
    }

    const [highlightedButton, setHighlightedButton] = useState(null);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Function to handle highlighting when the button is hovered over so that the icon pulses
    const handleButtonHighlight = (buttonName) => {
        setHighlightedButton(buttonName);
    };

    return (
        <div className="nav-container">
            <nav className="nav">

                <ul>
                    {/* Site logo and title */}
                    <li>
                        <Link to="/findEvent"
                            className="site-title link-style"
                            onMouseEnter={() => handleButtonHighlight('home')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'home' ? '' : ''}`}> {/* if we want to add an effect to the title add it here*/}
                                <img src={uoft} alt="Site Logo" style={{ width: '62px', height: '62px' }} />
                            </div>
                            PassionPals
                        </Link>
                    </li>
                    <li>
                        {/* Profile link */}
                        <Link to="/profile"
                            className={`link-style ${isActive('/profile') ? 'onTab' : ''}`}
                            onMouseEnter={() => handleButtonHighlight('profile')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'profile' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-circle-user"></i>
                            </div>
                            <span className="button-text">Profile</span>
                        </Link>
                    </li>
                    <li>
                        {/* Profile link */}
                        <Link to="/friend"
                            className={`link-style ${isActive('/friend') ? 'onTab' : ''}`}
                            onMouseEnter={() => handleButtonHighlight('friend')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'friend' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-user-plus"></i>
                            </div>
                            <span className="button-text">Add Friends</span>
                        </Link>
                    </li>
                    {/* <li>
                        {/* Profile link *
                        <Link to="/currentFriend"
                            className={`link-style ${isActive('/currentFriend') ? 'onTab' : ''}`}
                            onMouseEnter={() => handleButtonHighlight('currentFriend')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'currentFriend' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-user-group"></i>
                            </div>
                            <span className="button-text">Current Friends</span>
                        </Link>
                    </li> */}
                    <li>
                        {/* Create Event link */}
                        <Link to="/createEvent"
                            className={`link-style ${isActive('/createEvent') ? 'onTab' : ''}`}
                            onMouseEnter={() => handleButtonHighlight('createEvent')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'createEvent' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-square-plus"></i>
                            </div>
                            <span className="button-text">Create Event</span>
                        </Link>
                    </li>
                    <li>
                        {/* Find Events link */}
                        <Link to="/findEvent"
                            className={`link-style ${isActive('/findEvent') ? 'onTab' : ''}`}
                            onMouseEnter={() => handleButtonHighlight('findEvent')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'findEvent' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <span className="button-text">Find Events</span>
                        </Link>
                    </li>
                    <li>
                        {/* Messenger link */}
                        <Link to="/messenger" className={`link-style ${isActive('/messenger') ? 'onTab' : ''}`}
                            onMouseEnter={() => handleButtonHighlight('message')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'message' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-message"></i>
                            </div>
                            <span className="button-text">Chat</span>
                        </Link>
                    </li>
                    <li>
                        {/* Logout link */}
                        <Link onClick={logOut} className='link-style'
                            onMouseEnter={() => handleButtonHighlight('signout')}
                            onMouseLeave={() => handleButtonHighlight(null)}>
                            <div className={`icons  ${highlightedButton === 'signout' ? 'fa-beat' : ''}`}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </div>
                            <span className={`button-text ${highlightedButton === 'signout' ? 'show' : ''}`}>Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div >
    );
}
