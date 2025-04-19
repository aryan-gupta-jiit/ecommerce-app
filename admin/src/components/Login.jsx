import React from 'react'
import { useState } from 'react'

const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitHandler=async(e)=>{
        try{
            e.preventDefault();
        }
        catch(error){
            console.log(error);
            }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
    <div className='bg-white shoadow-md rounded-lg px-8 py-6'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' value={email} type='email' placeholder='your@email.com' required/>
            </div>
            <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' value={password} placeholder='Enter your password' required/>
            </div>
            <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md  text-white bg-gray-800 cursor-pointer'>Login</button>

        </form>
    </div>
    </div>
  )
}

export default Login