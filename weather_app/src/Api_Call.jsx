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
  const [err,setErr] = useState(false)
  useEffect(() => {
    setLoading(true)
    setErr(false)
    const cachedData = localStorage.getItem(city);
    if (cachedData){
      setAnalysis(JSON.parse(cachedData))
      setLoading(false)
    }
    else{
    if (props.check===true){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.long}&appid=693a2fbe55f5349f29c7fa6a465caff7`)
        .then(response =>{
          setAnalysis(response.data)
          localStorage.setItem(`${props.lat},${props.lon}`, JSON.stringify(response.data));
          setLoading(false)
          console.log(analysis)
        })
        .catch(err =>{
          setErr(true)
        console.error('Error fetching data:', err);
        setLoading(false);
        })
    }
    else{
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
      .then(response => {
        const locationData = response.data[0];
        if (locationData) {
          setLon(locationData.lon);
          setLat(locationData.lat);

          // Now fetch weather data using the lat and lon
          return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${import.meta.env.VITE_API_KEY}`);
        } else {
          setErr(True)
          throw new Error('Location data not found');
        }
      })
      .then(weatherResponse => {
        setAnalysis(weatherResponse.data);
        localStorage.setItem(city, JSON.stringify(weatherResponse.data));
        setLoading(false);
        console.log(analysis.wind)
      })
      .catch(error => {
        setErr(true)
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }
    
  }
  }, [city]);

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
