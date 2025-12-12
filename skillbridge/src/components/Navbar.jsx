import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
        <img className='w-44 cursor-pointer' src={assets.logo} alt=' ' />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Home</li>
    
            </NavLink>
            <NavLink to='/tutors'>
                <li className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">All Tutors</li>
                
            </NavLink>
            <NavLink to='/about'>
                <li className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">About</li>
                
            </NavLink>
            <NavLink to='/contact'>
                <li className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Contact</li>
                
            </NavLink>
        </ul>
        <div>
            <button className="rounded-xl bg-blue-500 px-4 py-2 hover:bg-blue-600">Create Account</button>
        </div>
    </div>
  )
}

export default Navbar