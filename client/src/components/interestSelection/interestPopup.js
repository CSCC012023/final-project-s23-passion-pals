import React from "react";
import SelectEdit from "./selectEdit";
import "./interestPopup.css";

function InterestModal({ isOpen, onClose }) {
    return (
        <div className={`interest-modal ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="interest-modal-content" onClick={(e) => e.stopPropagation()}>
                <SelectEdit
                    onClose={onClose} />
            </div>
        </div>
    )
}
export default InterestModal;