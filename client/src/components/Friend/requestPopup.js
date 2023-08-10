import React from "react";
import FriendList from './request.js'; // Path to the CountrySelector component
import '../Profile/locationModal.css'
import './requestPopup.css'
//Popup displaying the friend request component
function RequestModal({ isOpen, onClose }) {


    return (
        <div className={`request-modal ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="request-modal-content" onClick={(e) => e.stopPropagation()}>
                <FriendList />
            </div>
        </div>
    );
}

export default RequestModal;
