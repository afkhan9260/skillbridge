import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 align-center'>
        <div className='flex flex-col sm:grid grid-cols-[2fr_2fr_2fr] gap-14 my-10 mt-40 text-sm'>
                {/*Left  */}
                <div>
                    <img className='w-40' src={assets.logo} alt="logo" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-4 '>Skill Bridge is designed to connect you to talent that can help you achieve your goal</p>
                </div>

                {/*Center */}
                <div>
                    <p className='text-xl font-medium mb-4'>Organization</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>

                {/*Right  */}
                <div>
                    <p className='text-xl font-medium mb-4'>Get In Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>123-456-7890</li>
                        <li>skillbridge@gmail.com</li>
                    </ul>
                </div>
        
        </div>
         {/* Bottom Footer */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© 2025 Skill Bridge. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer