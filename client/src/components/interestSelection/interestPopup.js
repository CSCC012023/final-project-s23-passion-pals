import React from "react";
import SelectInterest from "./selectInterest";
import "./interestPopup.css";

function InterestModal({ isOpen, onClose }) {
    return (
        <div className={`interest-modal ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="interest-modal-content" onClick={(e) => e.stopPropagation()}>
                <SelectInterest />
            </div>
        </div>
    )
}
export default InterestModal;