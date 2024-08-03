import React from 'react';
import Laptop from '../../assets/laptop.png';
import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>Manage game your way</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Competitive Leaderboard</h1>
          <p>
          Challenge your friends and test your strategic skills with our exciting multiplayer Tic-Tac-Toe game. Whether you’re a seasoned pro or a newcomer, our game offers endless fun and competition.
          </p>
          <button className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'><Link to="/login">Play Now</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
