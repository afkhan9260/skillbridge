import React, { useState } from 'react'

const Login = () => {

    const [state, setState] = useState('Sign Up');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async(event) => {
        event.preventDefault();

    }
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
     <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold'> {state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
      <p>Please {state === 'Sign Up' ? 'sign up' : 'Login'} to book an appointment</p>
      {
        state === 'Sign Up' && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" placeholder='Full Name' value={name} required onChange={(e) => setName(e.target.value)} />
        </div>
      }  
      
        <div className='w-full'>
            <p>Email Address</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" placeholder='Email Address' value={email} required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='bg-blue-200 text-white w-full py-2 rounded-md text-base' type="submit">{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
            state === 'Sign Up'
            ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-blue-600 underline cursor-pointer'>Login</span></p>
            : <p>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-blue-600 underline cursor-pointer'>Sign Up</span></p>
        }      
        </div>
    
    </form>
  )
}

export default Login