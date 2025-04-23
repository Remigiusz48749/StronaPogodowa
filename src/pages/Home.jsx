import React, { useState } from 'react'; 
import './Home.css';
import CityWeather from '../components/CityWeather';
import CitySearch from '../components/CitySearch';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from '../slices/weatherSlice';

const Home = () => {
    const [cities, setCities] = useState(['Warsaw', 'Berlin', 'Paris', 'London', 'Madrid']);
    const dispatch = useDispatch();
    const unit = useSelector((state) => state.weather.unit); // Get the current unit from Redux

    const handleSearch = (city) => {
        setCities((prev) => [...new Set([...prev, city])]);
    };

    return (
        <div className="home">
            <h1 className="header">Home</h1>
            
            <button 
                className="unit-toggle" 
                onClick={() => dispatch(toggleUnit())}
            >
                Switch Units: {unit === 'metric' ? 'Imperial' : 'Metric'}
            </button>

            <div className="SearchBar">
                <CitySearch onSearch={handleSearch} />
            </div>
            <div className="weather-list">
                {cities.map((city) => (
                    <CityWeather key={city} city={city} />
                ))}
            </div>
        </div>
    );
};

export default Home;
