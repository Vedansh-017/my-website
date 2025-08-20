import React from 'react';

const NewsLetter = () => {
  return (
    <div className='text-center space-y-2 my-32 flex flex-col items-center justify-center px-4'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss A Blog !</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>
        Subscribe to get the latest blog, new tech, and exclusive news
      </p>
      <form className='flex w-full max-w-2xl'>
        <input
          type='email'
          placeholder='Enter your Email id'
          required
          className='flex-grow border border-gray-300 rounded-l-md h-12 px-3 outline-none text-gray-500'
        />
        <button
          type='submit'
          className='px-6 md:px-12 h-12 bg-blue-600/80 hover:bg-blue-600 text-white rounded-r-md transition-all'
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
