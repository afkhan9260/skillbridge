import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Tutors = () => {

    const {specialty } = useParams();
    const navigate = useNavigate();
    
    const [filterTutors, setFilterTutors] = useState([]);

    const {tutors} = useContext(AppContext);

    const applyFilter = () => {
        if(specialty){
            setFilterTutors(tutors.filter((tutor) => tutor.specialty.toLowerCase() === specialty.toLowerCase()));
        } else {
            setFilterTutors(tutors);
        }   
    }
    React.useEffect(() => { 
        applyFilter();

    }, [tutors, specialty]);
  return (
    <div>
    
    <p className='text-gray-600'> Browse Tutors by Specialty</p>
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
        <p onClick={() => specialty === 'Mathematics' ? navigate('/tutors') : navigate('/tutors/Mathematics') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-200 rounded transition-all cursor-pointer`}>Mathematics</p>
        <p onClick={() => specialty === 'Chemistry' ? navigate('/tutors') : navigate('/tutors/Chemistry') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-200 rounded transition-all cursor-pointer`}>Chemistry</p>
        <p onClick={() => specialty === 'Physics' ? navigate('/tutors') : navigate('/tutors/Physics') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-200 rounded transition-all cursor-pointer`}>Physics</p>
        <p onClick={() => specialty === 'Biology' ? navigate('/tutors') : navigate('/tutors/Biology') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-200 rounded transition-all cursor-pointer`}>Biology</p>
        <p onClick={() => specialty === 'Writing' ? navigate('/tutors') : navigate('/tutors/Writing') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-200 rounded transition-all cursor-pointer`}>Writing</p>
        <p onClick={() => specialty === 'Quran' ? navigate('/tutors') : navigate('/tutors/Quran') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-200 rounded transition-all cursor-pointer`}>Quran</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
            filterTutors.map((item,index)=>(
                <div onClick={()=> navigate(`/appointment/${item._id}`)}
                className='border border-white hover:scale-105 transition-all duration-300'key={index}>
                <img className='bg-blue-50 cursor-pointer' src={item.image} alt={item.name} />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available Now</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.specialty}</p>
                </div>
                </div>
            ))}
        </div>
    </div>
    </div>
  )
}

export default Tutors