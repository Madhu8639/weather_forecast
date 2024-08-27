import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent from './Api_Call'
import Icon from './Icon'
import main from "./assets/logo.png"

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
      <div className='flex flex-col items-center h-screen w-full justify-center   ' >
      <div>
        <img className='h-[200px]' src={main} alt="" />
      </div>
      <div className='mb-[30px] '>
        <form action="">
         <div className='flex flex-col justify-center items-center gap-9'>
          <div className='bg-white flex items-center p-[5px] space-x-1 rounded-[10px] md:w-[500px] '>
          <input onChange={handleChange} className=' rounded-[10px] h-[50px] w-[250px] md:w-full bg-transparent focus:border-none ' type="text" placeholder='please enter the location' name='location' />
          <button onClick={handleSubmit} className=''>submit</button>
          </div>
          <div>
          <button onClick={handlegeo} className=''>Use Current Location</button>
          </div>
          </div>
          
        </form>
        </div>
        <div>
        
        {city !== "" ? <MyComponent city = {city} />  : (check? <MyComponent lat = {lat} long = {long} check = {check} /> :<h1>no data</h1>) }
        </div>
      </div>
    </>
  )
}

export default App
