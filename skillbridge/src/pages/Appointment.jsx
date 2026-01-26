import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { tutorId } = useParams();
  const { tutors, currencySymbol, backendUrl, token, getTutorsData } =
    useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigate = useNavigate();

  const [tutorInfo, setTutorInfo] = useState(null);
  const [tutorSlots, setTutorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  

  const fetchTutorInfo = async () => {
    const tutorInfo = tutors.find((tutor) => tutor._id === tutorId);
    setTutorInfo(tutorInfo);
  };

  const getAvailableSlots = async () => {
    
    setTutorSlots([]);
    //getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(10, 0, 0, 0); // always start at 10:00
      // if today, start from next available hour
      if (i === 0) {
        const now = new Date();
        if (now.getHours() >= 10) currentDate.setHours(now.getHours() + 1);
        if (now.getMinutes() > 30) currentDate.setMinutes(30);
      }
      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = month + "_" + day + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          tutorInfo.slots_booked[slotDate] &&
          tutorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          //add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        //incrementing time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setTutorSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book Appointment");
      return navigate("/login");
    }

    try {
      const date = tutorSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = month + "_" + day + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { tutorId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getTutorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (tutors.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchTutorInfo();
    }
  }, [tutors, tutorId]);

  useEffect(() => {
    if (tutorInfo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getAvailableSlots();
    }
  }, [tutorInfo]);

  useEffect(() => {
    console.log(tutorSlots);
  }, [tutorSlots]);

  return (
    tutorInfo && (
      <div>
        {/*----Tutor Details----*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="w-full sm:max-w-72 rounded-lg"
              src={tutorInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 ">
              {tutorInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>Specialty: {tutorInfo.specialty}</p>
            </div>
            {/*----About----*/}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {" "}
                {tutorInfo.about}
              </p>
            </div>
            <p className="font-medium mt-4">
              Appointment Fee:{" "}
              <span>
                {currencySymbol}
                {tutorInfo.feePerHour}
              </span>
            </p>
          </div>
        </div>

        {/*----Available Slots----*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Available Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {tutorSlots.length &&
              tutorSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {tutorSlots.length &&
              tutorSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-blue-600 text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Appointment;
