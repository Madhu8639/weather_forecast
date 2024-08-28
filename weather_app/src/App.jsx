import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent from './Api_Call'
import Icon from './Icon'
import main from "./assets/sun.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [city, setcity] =useState("")
  const [temp,settemp] = useState("")
  const [check, setCheck] = useState(false)
  const [lat,setLat] = useState(0)
  const [long,setLong] = useState(0)
  
  const handleChange = (event) => {
    settemp(event.target.value);
  };
  

  const handlegeo = (event) =>{
    event.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              setLat(position.coords.latitude)
              setLong(position.coords.longitude)
              console.log(lat,long)
              setCheck(true)
          },
          (error) => {
              setError(error.message);
          }
      );
  } else {
      setError('Geolocation is not supported by this browser.');
  }
  }

  const handleSubmit = (event) => {
    setcity(temp)
    event.preventDefault();
  };
  return (
    <>
      <div className='flex flex-col items-center h-screen w-full justify-center  gap-3 ' >
      <div className='flex gap-5'>
        <img className='h-[100px]' src={main} alt="" />
        <h1 className='pt-4 font-extrabold text-[38px] text-white'>RT WEATHER</h1>
      </div>
      <div className='mb-[30px] '>
        <form action="">
         <div className='flex flex-col justify-center items-center gap-9'>
          <div className='bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100  flex items-center p-[5px] space-x-1 rounded-[10px] md:w-[500px] '>
          <input onChange={handleChange} className=' rounded-[10px] h-[50px] w-[250px] md:w-full bg-transparent focus:border-none ' type="text" placeholder='please enter the location' name='location'/>
          <button onClick={handleSubmit} className=''>submit</button>
          </div>
          <div>
          <button onClick={handlegeo} className=' border-2 border-black p-2 rounded-md'> <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Use Current Location</button>
          </div>
          </div>
          
        </form>
        </div>
        <div>
        
        {city !== "" ? <MyComponent city = {city} />  : (check? <MyComponent lat = {lat} long = {long} check = {check}  /> :<h1>no data</h1>) }
        </div>
      </div>
    </>
  )
}

export default App
