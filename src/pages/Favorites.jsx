import React from 'react';
import { useSelector } from 'react-redux';
import CityWeather from '../components/CityWeather';

const Favorites = () => {
    const favorites = useSelector((state) => state.weather.favorites);

    return (
        <div className="home">
            <h1 className="header">Favorites</h1>
            <div className='weather-list'>
                {favorites.length > 0 ? (
                    favorites.map((city) => <CityWeather key={city} city={city} />)
                ) : (
                    <p>No favorite cities added.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;