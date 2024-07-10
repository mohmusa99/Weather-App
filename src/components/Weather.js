import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import search from '../images/Vector.svg'
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    

    const API_KEY = 'b08695d36b0cf8810223b492af289550';
    const GEO_API_KEY = 'e113c60615654c13b5b527ceac816e0f';

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setLoading(false);
            navigate('/result', { state: { weather: response.data } });
        } catch (error) {
            setLoading(false);
            setError('Error fetching the weather data');
        }
    };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEO_API_KEY}`);
                    const city = geoResponse.data.results[0].components.city || geoResponse.data.results[0].components.town || geoResponse.data.results[0].components.village;
                    setCity(city);
                    console.log(city)
                    fetchWeather();
                } catch (error) {
                    setError('Error fetching location data');
                }
            }, () => {
                setError('Geolocation not supported or permission denied');
            });
        } else {
            setError('Geolocation not supported by this browser');
        }
    };

    return (
        <div className="weather-container">
            <div className='pt-5 px-12 pb-16 bg-white shadow rounded-lg max-w-lg mx-auto'>
                <h1 className='blinker font-semibold text-2xl text-[#533745] mb-[48.5px]'>Weather App</h1>
                <div className="content max-w-md mx-auto">
                    {loading && <div className="bg-[#F4F1F3] w-full max-w-sm py-3 text-center mx-auto mb-[10px]">Loading...</div>}
                    {error && <div className="bg-[#F4F1F3] w-full max-w-sm py-3 text-center mx-auto mb-[10px]">{error}</div>}
                    <div className="search-wrap shadow max-w-sm flex flex-row justify-center mx-auto bg-[#F7EDF0]">
                        <input className='inter font-normal text-[12px] w-full bg-inherit border-none outline-none' type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)} placeholder='Enter city name' />
                        <div className='bg-[#826C7F] p-4 cursor-pointer' onClick={fetchWeather} disabled={loading}><img src={search} alt="" /></div>
                    </div>
                    <div className="separator-wrap flex flex-row items-center mx-auto my-3 gap-3 w-1/2">
                        <hr className='w-full bg-[#EFEBCE] h-[2px]' />
                        <span className='text-[#826C7F] inter font-normal text-[12px]'>or</span>
                        <hr className='w-full bg-[#EFEBCE] h-[2px]' />
                    </div>
                    <button className='rounded-none w-full max-w-sm bg-[#C4A287] inter font-normal text-[12px]' onClick={getLocation} disabled={loading}>Use device location</button>
                </div>
            </div>

        </div>
    );
};

export default Weather;
