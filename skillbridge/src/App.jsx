import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Tutors from './pages/tutors'
import Login from './pages/login'
import About from './pages/about'
import Contact from './pages/contact'
import MyProfile from './pages/myprofile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer/>
    <Navbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path= '/tutors' element={<Tutors />}/>
      <Route path= '/tutors/:specialty' element={<Tutors />}/>
      <Route path= '/login' element={<Login />}/>
      <Route path= '/about' element={<About />}/>
      <Route path= '/contact' element={<Contact />}/>
      <Route path= '/my-profile' element={<MyProfile />}/>
      <Route path= '/my-appointments' element={<MyAppointments />}/>
      <Route path= '/appointment/:tutorId' element={<Appointment />}/>

      </Routes>
      <Footer />
    
    </div>
  )
}

export default App