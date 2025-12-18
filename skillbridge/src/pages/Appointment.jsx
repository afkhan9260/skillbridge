import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {

    const {tutorId} = useParams();
    const {tutors} = useContext(AppContext);
    const [tutorInfo, setTutorInfo] = React.useState(null);

    React.useEffect(() => {
        if (!tutors || tutors.length === 0) return;
    const fetchTutorInfo = async() => {
        const tutorInfo = tutors.find((tutor) => tutor._id === tutorId);
        setTutorInfo(tutorInfo);
        console.log(tutorInfo);
    }
        fetchTutorInfo();
    },[tutors, tutorId]);

  return tutorInfo && (
    <div>
    {/*----Tutor Details----*/}
    <div className='flex flex-col sm:flex-row gap-4'>
        <div>
        <img className='w-full sm:max-w-72 rounded-lg' src={tutorInfo.image} alt= ""/>
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
            {tutorInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt=""/> 
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                <p>Degree: {tutorInfo.degree} - {tutorInfo.specialty}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full'>{tutorInfo.experience}</button>
            </div>
           {/*----About----*/} 
        <div>
       <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
       About <img src={assets.info_icon} alt=""/></p>
       <p> {tutorInfo.about}</p>
        </div>    
        
        </div>
    </div>
       
    
    </div>
  )
}

export default Appointment