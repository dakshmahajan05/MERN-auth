import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'

  import { toast } from 'react-toastify';

const  Login = () => {

    const {backendUrl} = useContext(AppContext)
    const {isLoggedIn,setIsLoggedIn} = useContext(AppContext)

   const onsubmithandler = async(e)=>{
  e.preventDefault();
  try {
    axios.defaults.withCredentials=true
    const {email, fullname, password} = formdata;

    if(state === 'signup'){
      const {data} = await axios.post(`${backendUrl}/api/auth/register`, { fullname,email, password })

      if(data.success){
        setIsLoggedIn(true)
        navigate('/')
      }else{
        toast.error(data.message)
      }
    }else{
      const {data} = await axios.post(`${backendUrl}/api/auth/login`, { email, password })

      if(data.success){
        setIsLoggedIn(true)
        navigate('/')
      }else{
        toast.error(data.message)
      }
    }

  } catch (error) {
    console.log("Error:", error);
    toast.error("Server ka mooh latka hua hai 🤡");
  }
}


    const navigate = useNavigate()
    const [state,setstate] = useState('signup')
    const [formdata,setformdata] = useState({
        'email':'',
        'fullname':'',
        'password':''
    })
    const handlechange = (e)=>{
        setformdata((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
  return (
    <div className='relative bg-gradient-to-br flex items-center justify-center from-blue-200 to-purple-400 min-h-screen'>
        <h1 onClick={()=>navigate('/')} className="absolute cursor-pointer top-4 left-4 text-4xl">😈</h1>

        <div className='sm:w-80 rounded-2xl flex flex-col items-center py-4 px-3 w-20 bg-gray-700  '>
            <h1 className='text-3xl mb-1 text-white font-bold'>{state==='signup'?'Create Account':'Login'}</h1>
            <p className='text-gray-500 mb-6'>{state==='signup'?'Create Your Account':'Login to your Acount'}</p>

            <form onSubmit={onsubmithandler} action="">
                <div className='flex flex-col items-center gap-3'>
                    {state==='signup' && (
                <input onChange={handlechange} name='fullname' value={formdata.fullname} className='bg-gray-600 mx-2 py-3 px-4 text-white  rounded-2xl' type="text" placeholder='Full Name' />

                    )}
                <input onChange={handlechange} name='email' value={formdata.email} className='bg-gray-600 mx-2  py-3 px-4 text-white rounded-2xl' type="text" placeholder='Email' />
                <input onChange={handlechange} name='password' value={formdata.password} className='bg-gray-600 mx-2  py-3 px-4 text-white rounded-2xl' type="password" placeholder='Password' />
                </div>
                <p onClick={()=>navigate('/reset-pass')} className='ml-3 cursor-pointer mt-1 text-blue-500'>forgot password? </p>

                <button className='w-full text-white font-bold bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl mb-1 mt-4 py-2 cursor-pointer hover:bg-blue-600'>{state==='signup'?"Sign Up":"Sign In"}</button>
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