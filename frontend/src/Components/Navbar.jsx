import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full  flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <p className='text-3xl font-bold shadow'>😈</p>
        <button onClick={()=>(navigate('/login'))} className='flex items-center gap-2 rounded-md border border-gray-500 px-6 py-2 text-shadow-gray-800 hover:bg-gray-100 transition-all '>Login →</button>

    </div>
  )
}

export default Navbar