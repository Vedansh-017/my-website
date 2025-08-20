import React from 'react'
import assets from '../assets/assets'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-blue-600/3'>
      <div className='flex flex-col md:flex-row justify-between items-start gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
            <div>
                <img src={assets.print} alt="" className='w-32 sm:w-52' />
                <p className='max-w-[450px] mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis temporibus iusto, aperiam, numquam dolorum repellat, eaque incidunt quaerat cum magni cumque quia ipsam! Voluptatibus dolores sed distinctio iste nihil omnis.</p>
            </div>
            <div className='flex flex-wrap justify-between gap-15 w-full md:w-auto'>
                {footer_data.map((section,index) => (
                    <div key={index}>
                              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                              <ul className='text-sm space-y-1'>
                                {section.links.map((link, i) => (
                                     <li key={i}>
                                        <a href='#' className='hover:underline transition'>{link}</a>
                                     </li>
                                ))}
                              </ul>
                        </div>
                        ))}
            </div>
      </div>
      <p  className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyroght 2025 @ Blogsphere All Right Reserved</p>
    </div>
  )
}

export default Footer
