import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../slices/weatherSlice';
import axios from 'axios';

const CityWeather = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null); // New state for forecast data
    const [detailedView, setDetailedView] = useState(false);
    const APIKEY = "134ccf79617b1984f2d46b5c9a933162"
    const unit = useSelector((state) => state.weather.unit);
    const dispatch = useDispatch();

    // Fetch weather data
    const fetchWeather = useCallback(async () => {
        try {
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${APIKEY}`
            );
            setWeather(weatherResponse.data);
        } catch (error) {
            console.error(error);
        }
    }, [city, unit]);

    // Fetch forecast data
    const fetchForecast = useCallback(async () => {
        try {
            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${APIKEY}`
            );
            setForecast(forecastResponse.data);
        } catch (error) {
            console.error(error);
        }
    }, [city, unit]);

    // Fetch both current weather and forecast on load and whenever city or unit changes
    useEffect(() => {
        fetchWeather();
        fetchForecast();
    }, [fetchWeather, fetchForecast]);

    return (
        <div className="city-weather">
            <h3>{city}<button className='LeftMargin' onClick={() => dispatch(toggleFavorite(city))}>★</button></h3>
            {weather && (
                <div className="weather">
                    <p>Temperature: {weather.main.temp} °{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                    />
                    <p>Wind: {weather.wind.speed} m/s, {weather.wind.deg}°</p>
                    <p>Cloudiness: {weather.clouds.all}%</p>
                    <button onClick={() => setDetailedView((prev) => !prev)}>
                        {detailedView ? 'Hide Forecast' : 'Show Forecast'}
                    </button>
                    {detailedView && forecast && (
                        <>
                            <h4>5-Day Forecast</h4>
                            <div className="forecast">
                                <hr></hr>
                                {forecast.list.slice(0, 40).map((item, index) => (
                                    <div key={index} className="forecast-item">
                                        <p>{new Date(item.dt * 1000).toLocaleDateString()} {new Date(item.dt * 1000).toLocaleTimeString()}</p>
                                        <p>Temp: {item.main.temp} °{unit === 'metric' ? 'C' : 'F'}</p>
                                        <p>Weather: {item.weather[0].description}</p>
                                        <p>Rain Probability: {item.pop * 100}%</p>
                                        <p>Rain Amount: {item.rain ? `${item.rain['3h']} mm` : 'No rain'}</p>
                                        <img
                                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                            alt={item.weather[0].description}
                                        />
                                        <p>Wind: {item.wind.speed} m/s</p>
                                        <p>Cloudiness: {item.clouds.all}%</p>
                                        <hr></hr>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CityWeather;