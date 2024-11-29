import React from 'react'
import { Link } from 'react-router-dom'
import HospitalLocater from './HospitalLocater'

const Header = () => {
  return (
    <div className='h-fit shadow-lg bg-transparent grid grid-cols-2 float-right p-1' >
        <div className='text-2xl'>
            Vaccination App  
        </div>
        <div className=" justify-end gap-2 flex ">
            
            <Link to="/contactUs" className='text-blue-500 w-fit border-2 rounded-lg bg-gray-200 p-1 hover:text-purple-500' > <b>Contact</b></Link>
            <Link to="/aboutUs" className='text-blue-500 w-fit border-2 rounded-lg bg-gray-200 p-1 hover:text-purple-500'><b>About Us</b></Link>
        </div>
    </div>
  )
}

export default Header