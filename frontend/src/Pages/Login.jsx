import React from 'react'
import { useState } from 'react'

const  Login = () => {
    const [state,setstate] = useState('signup')
  return (
    <div className='bg-gradient-to-br flex items-center justify-center from-blue-200 to-purple-400 min-h-screen'>
        <div className='sm:w-80 rounded-2xl flex flex-col items-center py-4 px-3 w-20 bg-gray-700  '>
            <h1 className='text-3xl mb-1 text-white font-bold'>{state==='signup'?'Create Account':'Login'}</h1>
            <p className='text-gray-500 mb-6'>{state==='signup'?'Create Your Account':'Login to your Acount'}</p>

            <form action="">
                <div className='flex flex-col items-center gap-3'>
                    {state==='signup' && (
                <input className='bg-gray-600 mx-2 py-3 px-4 text-white  rounded-2xl' type="text" placeholder='Full Name' />

                    )}
                <input className='bg-gray-600 mx-2  py-3 px-4 text-white rounded-2xl' type="text" placeholder='Email' />
                <input className='bg-gray-600 mx-2  py-3 px-4 text-white rounded-2xl' type="text" placeholder='Password' />
                </div>
                <p className='ml-3 cursor-pointer mt-1 text-blue-500'>forgot password? </p>

                <button className='w-full text-white font-bold bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl mb-1 mt-4 py-2 cursor-pointer hover:bg-blue-600'>{state==='signup'?"Sign Up":"Register"}</button>
                {state==='signup'?(

                    <p className='mb-3'>already have an account? <span onClick={()=>setstate('login')} className='underline text-blue-600 cursor-pointer'>Login here</span> </p>
                ):(

                <p className='mb-3'>don't have an account? <span onClick={()=>setstate('signup')} className='underline text-blue-600 cursor-pointer'>Sign Up</span> </p>
                )}
            </form>
        </div>
    </div>
  )
}

export default  Login