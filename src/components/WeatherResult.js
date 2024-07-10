import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Weather.css';
import Pin from '../images/pin.svg'
import Arrow from '../images/back-arrow.png'
import Temp from '../images/temp.svg'
import Drop from '../images/drop.svg'


import ClearDay from '../images/day-clearSky.svg';
import ClearNight from '../images/night-clearSky.svg';
import RainDay from '../images/day-rain.svg';
import RainNight from '../images/night-rain.svg';
import CloudsDay from '../images/day-fewClouds.svg';
import CloudsNight from '../images/night-fewClouds.svg';
import SnowDay from '../images/day-snow.svg';
import SnowNight from '../images/night-snow.svg';
import StormDay from '../images/day-rain.svg';
import StormNight from '../images/night-rain.svg';
import MistDay from '../images/day-fewClouds.svg';
import MistNight from '../images/night-fewClouds.svg';

const WeatherResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { weather } = location.state || {};

    
    const weatherIcons = {
        Clear: { day: ClearDay, night: ClearNight },
        Rain: { day: RainDay, night: RainNight },
        Clouds: { day: CloudsDay, night: CloudsNight },
        Snow: { day: SnowDay, night: SnowNight },
        Storm: { day: StormDay, night: StormNight },
        Mist: { day: MistDay, night: MistNight },
    };

    // Determine if it is currently day or night 
    const isDayTime = () => {
        const currentTime = new Date().getTime() / 1000;
        const sunrise = weather.sys.sunrise;
        const sunset = weather.sys.sunset;
        return currentTime > sunrise && currentTime < sunset;
    };

    
    const getWeatherIcon = (condition) => {
        const timeOfDay = isDayTime() ? 'day' : 'night';
        if (weatherIcons[condition]) {
            return weatherIcons[condition][timeOfDay];
        }
        return CloudsDay; 
    };

    return (
    <div className="weather-result-container max-w-md mx-auto shadow">
            {weather ? (
                <>
                    <div className='bg-[#F7EDF0] rounded-t-lg p-8'>
                        <div className="relative">
                            <img src={Arrow} className='absolute top-0 left-0 cursor-pointer hover:opacity-75 hover:shadow-lg transition duration-200' onClick={() => navigate(-1)} alt='Back' />
                            <h1 className='blinker font-semibold text-2xl text-[#533745] mb-[48.5px]'>Weather App</h1>
                        </div>
                        <div className='flex flex-col'>
                            <div className="flex gap-1 justify-center mb-3  ">
                                <img src={Pin} alt="Pin" /><span className='inter text-xl text-[#533745]'>{weather.name}</span>
                            </div>
                            <div className="flex justify-center mb-2">
                                <img src={getWeatherIcon(weather.weather[0].main)} className='w-[160px] h-[160px]' alt="weather icon" />
                            </div>
                            <div className="flex flex-col">
                                <p className='inter text-base text-[#533745]'>{weather.weather[0].description}</p>
                                <p className='text-[#533745] font-semibold text-5xl'>{weather.main.temp}°C</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex justify-center items-center gap-4 border-r border-[##D1C7CF] rounded-bl-lg py-2 px-10 w-1/2 bg-[#826C7F]">
                            <img src={Temp} alt="Temperature" />
                            <div className="flex flex-col text-start text-[#F3F1F3]">
                                <span>{weather.main.feels_like}°C</span>
                                <span>Feels like</span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 py-2 px-10 w-1/2 bg-[#826C7F] rounded-br-lg">
                            <img src={Drop} alt="" />
                            <div className="flex flex-col text-start text-[#F3F1F3]">
                                <span>{weather.main.humidity}%</span>
                                <span>Humidity</span>
                            </div>
                        </div>

                    </div>
                </>
            ) : (
                <div className='max-w-md mx-auto relative'>
                    <img src={Arrow} className='absolute top-0 -left-1/2 cursor-pointer' onClick={() => navigate(-1)} alt='Back' />
                    <p>No weather data available. Please go back and try again.</p>
                </div>
            )}
        </div>
    );
};

export default WeatherResult;
