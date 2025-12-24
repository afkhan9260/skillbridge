import React, {useState} from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();

    //const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt=' ' />
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
        <div className='flex items-center gap-4'>
        {
            token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt=""/>
            <img className= 'w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={() =>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
            </div>
        </div>
            : <button onClick={() => navigate('/login')} className="rounded-full font-light bg-blue-500 px-4 py-2 hover:bg-blue-600 hidden md:block">Create Account</button>
        }
            
        </div>
    </div>
  )
}

export default Navbar