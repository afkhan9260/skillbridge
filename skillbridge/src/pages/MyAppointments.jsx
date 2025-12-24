import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const {tutors} = useContext(AppContext);

  return (
    <div className=' border p-6 rounded-lg shadow-md mt-10'>
      <p className='pb-4 mt-5 mb-5 text-center font-medium color-zinc-700'>My Appointments</p>
      <div className='mt-5'>
        {tutors.slice(0,3).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-3 sm:flex sm:gap-3 py-2' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt =""/>
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.specialty}</p>
                <p>Appointment on: 25th Dec, 2023</p>
                <p><span>Time: 10:00 AM - 10:30 AM</span></p>
            </div>

              <div></div>

              <div className='flex flex-col gap-4 sm:items-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-500 hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel Appointment</button>
              </div>
            
          </div>
      ))}
      </div>
    </div>
  )
}

export default MyAppointments