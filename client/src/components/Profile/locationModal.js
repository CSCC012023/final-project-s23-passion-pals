import React, { useState } from "react";
import CountrySelector from '../Form/countrySelector'; // Path to the CountrySelector component
import './locationModal.css'
//Popup displaying the countrySelector
function Modal({ isOpen, onClose, onSave, onDelete, user }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSave = async (e) => {
        e.preventDefault();

        if (selectedLocation) {
            let locationString = '';

            if (selectedLocation.eventCity) {
                locationString += selectedLocation.eventCity;
                if (selectedLocation.eventRegion || selectedLocation.eventCountry) {
                    locationString += ', ';
                }
            }

            if (selectedLocation.eventRegion) {
                locationString += selectedLocation.eventRegion;
                if (selectedLocation.eventCountry) {
                    locationString += ', ';
                }
            }

            if (selectedLocation.eventCountry) {
                locationString += selectedLocation.eventCountry;
            }
            onSave(locationString, e);

        }
    };

    const handleDeleteLocation = (locationIndex) => {
        // Call the onDelete prop function to remove the location from the user's profile
        onDelete(locationIndex);
    };

    const isSaveButtonDisabled = !selectedLocation || !selectedLocation.eventCountry;

    return (
        <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add Locations</h2>
                <div className="country-selector">
                    <CountrySelector postData={selectedLocation} setPostData={setSelectedLocation} />
                </div>

                <div className="modal-buttons">
                    <button
                        onClick={handleSave}
                        disabled={isSaveButtonDisabled}
                        className={isSaveButtonDisabled ? "greyed-out" : ""}>
                        Save
                    </button>
                    <button onClick={onClose}
                        disabled={user && user.locations && user.locations.length === 0}
                        className={user && user.locations && user.locations.length === 0 ? "greyed-out" : ""}>
                        Cancel
                    </button>
                </div>

                {/* Added section to display the user's added locations */}
                <h3>Your Locations</h3>
                <div className="added-locations">
                    <div className="added-locations-scrollable">
                        {user && user.locations && user.locations.length > 0 ? (
                            <ul>
                                {user.locations.map((location, index) => (
                                    <li key={index} className="location-text">{location}
                                        <button onClick={() => handleDeleteLocation(index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>None</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
