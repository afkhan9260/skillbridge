import React, { useState } from 'react'
import { assets } from '../assets/assets';

const MyProfile = () => {

    const [userData, setUserData] = useState({
        name: 'John Doe',
        image: assets.profile_pic,
        email: 'john@example.com',
        phone: '123-456-7890',
        bio: 'A brief bio about John Doe.'
    });

        const [isEdit, setIsEdit] = useState(false);
  return (
    <div className='max-w-lg flex flex-col gap-3 text-sm text-center mx-auto border p-6 rounded-lg shadow-md mt-5'>
    
    <img src={userData.image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mt-5" />
    
    {
        isEdit 
        ? <input className='bg-gray-50 text-3xl font-medium text-center max-w-60 mt-4'
            type="text" 
            value={userData.name} 
            onChange={(e) => setUserData(prev =>({...prev, name: e.target.value}))}
        />
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
    }

    <hr className='bg-zinc-400 h-[2px] border-none' />
    <div>
      <p className='text-neutral-500 underline mt-3'>Contact Information</p>
      <div className='grid grid-cols-[1fr_2fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Email:</p>
        <p className='text-blue-500'>{userData.email}</p>
        <p className='font-medium'>Phone: </p>
        {
        isEdit 
        ? <input className='bg-gray-100 max-w-52'
            type="text" 
            value={userData.phone} 
            onChange={(e) => setUserData(prev =>({...prev, phone: e.target.value}))}
        />
        : <p className='text-blue-400'>{userData.phone}</p>
    }
        <p className='font-medium'>Bio:</p>
        {
        isEdit 
        ? <textarea className='bg-gray-200 max-w-60 h-34'
            value={userData.bio}
            onChange={(e) => setUserData(prev =>({...prev, bio: e.target.value}))}
        />
        : <p className='text-blue-400'>{userData.bio}</p>
        }
      </div>
    
    </div>
        <div className='mt-10'>
        {
            isEdit
            ? <button className='border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save Profile</button>
            : <button className='border border-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all'  onClick={() => setIsEdit(true)}>Edit Profile</button>
        }
        </div>
</div>
  )
}

export default MyProfile