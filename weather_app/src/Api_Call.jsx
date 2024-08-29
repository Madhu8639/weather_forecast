import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from './Icon.jsx';
import hot from "./assets/hot.gif"
import wind from "./assets/wind.gif"
import cloudy from "./assets/cloudy.gif"
import drop from "./assets/drop.gif"

const MyComponent = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lon,setLon] = useState(0)
  const [lat,setLat] = useState(0)
  const [analysis,setAnalysis] = useState([])
  const city = props.city
  const check = props.check
  const [err,setErr] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(false);

        const cachedData = localStorage.getItem(city);
        if (cachedData) {
          setAnalysis(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        if (check === true) {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${import.meta.env.VITE_API_KEY}`
          );
          setAnalysis(weatherResponse.data);
          setLoading(false);
          console.log(analysis);
        } else {
          const locationResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${import.meta.env.VITE_CITY_API_KEY}`
          );

          console.log("OpenCage API Response:", locationResponse.data);

          if (locationResponse.data && locationResponse.data.results && locationResponse.data.results.length > 0) {
            const locationData = locationResponse.data.results[0];
            setLon(locationData.geometry.lng);
            setLat(locationData.geometry.lat);

            // Now fetch weather data using the lat and lon
            const weatherResponse = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.geometry.lat}&lon=${locationData.geometry.lng}&appid=${import.meta.env.VITE_API_KEY}`
            );
            setAnalysis(weatherResponse.data);
            localStorage.setItem(city, JSON.stringify(weatherResponse.data));
            setLoading(false);
          } else {
            setErr(true);
            throw new Error('Location data not found');
          }
        }
      } catch (error) {
        setErr(true);
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.city,props.check,props.lat,props.lon]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (err){
    return  <div className="p-7   bg-gray-0 rounded-md bg-clip-padding 
    backdrop-filter backdrop-blur-md bg-opacity-30 
    border border-gray-100">
    <h1 className='text-red-700'>Wrong location Entered</h1></div>
  }
  return (
    <div  >
    <p >City : {analysis.name}</p>
      {analysis.main && (
        <div className='grid grid-cols-2 gap-4 md:flex md:gap-3'>
          {/* <p>Temperature: {}</p>
          <p>Weather: {}</p>
          <p>Humidity: </p>
          <p>Wind Speed:  m/s</p> */}
          
          <Icon image = {hot} val = {`${Math.round(analysis.main.temp-273.15)}°C`}/>
          <Icon image = {drop} val={`${analysis.main.humidity}%`} />
          <Icon image = {wind} val = {`${analysis.wind.speed}KMPH`}  />
          <Icon image = {cloudy} val={analysis.weather[0].description}  />
        </div>
      )}
    </div>
  );
};

export default MyComponent;
