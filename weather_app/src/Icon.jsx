import React, { useState } from 'react'
import hot from './assets/hot.gif'
const Icon = (prop) => {
    const [val,setval] = useState(33)
  return (
    <div className="p-7 w-[127px] flex flex-col justify-center items-center gap-2 bg-gray-0 rounded-md bg-clip-padding 
        backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <img className='h-[70px] ' src={prop.image} alt="" />
        <h1 className='pl-[5px]'>{prop.val}</h1>
        </div> 
  )
}

export default Icon