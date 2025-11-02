import React from 'react'

const Header = () => {
  return (
    <div className='flex hover:bg-blue-200 flex-col mt-20 px-4 text-center text-gray-800  items-center '>
        <h1 className='flex items-center  sm:text-9xl text-3xl mb-10'>👽</h1>
        <h1 className='text-xl font-bold shadow-gray-400 mb-3'>Heyy Developer.. 👋🏻</h1>
        <p className='mb-4 text-4xl font-bold'>Welcome to our Website😎</p>
        <p className='w-700 sm:w-120 mb-4'>Lets start a quick product tour and we will have you up and running in no time!</p>
        <button className='bg-gray-300 mb-10 rounded-2xl px-3 py-1 border border-gray-400 hover:bg-gray-200 cursor-pointer'>Get Started😌</button>

    </div>
    
  )
}

export default Header