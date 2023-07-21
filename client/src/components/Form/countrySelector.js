import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

function CountrySelector({ postData, setPostData }) {
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        // Fetch all countries once on component mount
        const countries = Country.getAllCountries();
        setCountryOptions([]);
        setStateOptions([]);
        setCityOptions([]);
        setPostData((prevData) => ({ ...prevData, eventCountry: "" }));
        setPostData((prevData) => ({ ...prevData, eventRegion: "" }));
        setPostData((prevData) => ({ ...prevData, eventCity: "" }));
        // Convert the country data to react-select compatible format
        const options = countries.map((country) => ({
            value: country.isoCode,
            label: country.name,
        }));
        setCountryOptions(options);
    }, []);

    const handleCountryChange = (selectedCountry) => {
        setSelectedCountry(selectedCountry);
        setSelectedRegion(null);
        setSelectedCity(null);
        setCityOptions([]);
        setPostData((prevData) => ({
            ...prevData,
            eventCountry: selectedCountry?.label || "",
            eventRegion: "",
            eventCity: "",
        }));
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry.value);
            const stateOptions = states.map((state) => ({
                value: state.isoCode,
                label: state.name,
            }));
            setStateOptions(stateOptions);
        }
    };

    const handleStateChange = (selectedRegion) => {
        setSelectedRegion(selectedRegion);
        setSelectedCity(null);
        setPostData((prevData) => ({
            ...prevData,
            eventRegion: selectedRegion ? selectedRegion.label : "",
            eventCity: "",
        }));
        if (selectedRegion) {
            const cities = City.getCitiesOfState(postData.eventCountry, selectedRegion.value);
            const cityOptions = cities.map((city) => ({
                value: city.name,
                label: city.name,
            }));
            setCityOptions(cityOptions);
        }
    };

    const handleCityChange = (selectedCity) => {
        setSelectedCity(selectedCity);
        setPostData((prevData) => ({ ...prevData, eventCity: selectedCity.value }));
    };

    return (
        <div className="locationSelector">
            <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Select Country"
            />

            <Select
                options={stateOptions}
                value={selectedRegion}
                onChange={handleStateChange}
                placeholder="Select Region"
                isDisabled={!selectedCountry}
            />


            <Select
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                placeholder="Select City"
                isDisabled={!selectedRegion}
            />

        </div>
    );
}

export default CountrySelector;
