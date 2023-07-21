import React, { useState } from "react";
import CountrySelector from '../Form/countrySelector'; // Path to the CountrySelector component
import './locationModal.css'

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
                <h2>Select Country, Region, and City</h2>
                <CountrySelector postData={selectedLocation} setPostData={setSelectedLocation} />

                <div className="modal-buttons">
                    <button
                        onClick={handleSave}
                        disabled={isSaveButtonDisabled}
                        className={isSaveButtonDisabled ? "greyed-out" : ""}>
                        Save
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>

                {/* Added section to display the user's added locations */}
                <div className="added-locations">
                    <h3>Added Locations:</h3>
                    {user && user.locations && user.locations.length > 0 ? (
                        <ul>
                            {user.locations.map((location, index) => (
                                <li key={index}>{location}
                                    <button onClick={() => handleDeleteLocation(index)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No locations added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
