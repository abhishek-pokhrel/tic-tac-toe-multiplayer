import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <h1 className='md:text-7xl sm:text-5xl text-4xl font-bold md:py-6 text-[#00df9a]'>
        Challenge your friends now!
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-3xl text-xl font-bold py-4 text-[#00df9a]'>
            Fast & Multiplayer
          </p>
          
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>
          Interactive UI
        </p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>
          <Link to="/signup">Register Now!!</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
