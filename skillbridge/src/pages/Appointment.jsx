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
    <div>
        <div>
        <img src={tutorInfo.image} alt= ""/>
        </div>

        <div>
            <p>
            {tutorInfo.name} 
            <img src={assets.verified_icon} alt=""/> 
            </p>
            <div>
                <p>Degree: {tutorInfo.degree} - {tutorInfo.specialty}</p>
                <button>{tutorInfo.experience}</button>
            </div>
            
        <div>
       <p>About <img src={assets.info_icon} alt=""/></p>
       <p> {tutorInfo.about}</p>
        </div>    
        
        </div>
    </div>
       
    
    </div>
  )
}

export default Appointment