import React, { use } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {


   const {navigate, token} = useAppContext()
  return ( 
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-30 xl:mx-32'> 
       <img onClick={()=>navigate('/')} src={assets.print} alt="Logo" className='w-50 sm:w-55 cursor-pointer' />
       <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 bg-blue-500 text-white px-10 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition duration-300'>
         {token ? 'Dashboard' : 'Login'}
         <img  src={assets.arrow} alt="Login Icon" className='w-3' />
       </button>
    </div>
  )
}

export default Navbar
