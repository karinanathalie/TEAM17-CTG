import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function SideBar({ children }) {
    const location = useLocation();

    const [active_link, set_active_link] = useState('home');
    useEffect(() => {
        console.log("hello")
      const pathname = window.location.pathname.split('/')[1];
      set_active_link(pathname);
    }, []);

    return (
      <div className='flex flex-row h-full w-full rounded-full'>
        <div className='bg-darkgray rounded-r-2xl h-full'>
            <div className=" mx-[30px] mt-[40px] sidebar w-[250px] text-white">
            <div className='my-[5px] mb-[20px]'>
                <img src='http://placehold.it/250x80'></img>
            </div>
            <nav>
                <ul>
                <li className='mb-[15px] font-[700]'>
                    <div className={active_link != 'home' ? 'bg-darkgray text-white py-[10px] rounded-2xl' : 'bg-white text-black py-[10px] rounded-2xl'}>
                        <HomeOutlinedIcon />
                        <Link to="/home" className="ml-[15px]" onClick={() => {set_active_link('home')}}>
                        Home
                        </Link>
                    </div>
                </li>
                <li className='mb-[15px] font-[700]'>
                    <div className={active_link != 'events' ? 'bg-darkgray text-white py-[10px] rounded-2xl' : 'bg-white text-black py-[10px] rounded-2xl'}>
                        <BarChartOutlinedIcon />
                        <Link to="/events" className="ml-[15px]" onClick={ () => {set_active_link('events')}}>
                        Events
                        </Link>
                    </div>
                </li>
                <li className='mb-[15px] font-[700]'>
                    <div className={active_link != 'about' ? 'bg-darkgray text-white py-[10px] rounded-2xl' : 'bg-white text-black py-[10px] rounded-2xl'}>
                        <InfoOutlinedIcon />
                        <Link to="/about" className="ml-[15px]" onClick={ () => {set_active_link('about')}}>
                        About
                        </Link>
                    </div>
                </li>
                <li className='mb-[15px] font-[700]'>
                    <div className={active_link != 'user' ? 'bg-darkgray text-white py-[10px] rounded-2xl' : 'bg-white text-black py-[10px] rounded-2xl'}>
                        <PermIdentityOutlinedIcon />
                        <Link to="/user" className="ml-[15px]" onClick={ () => {set_active_link('user')}}>
                        User
                        </Link>
                    </div>
                </li>
                </ul>
            </nav>
            </div>
        </div>
        <div className='w-full h-full'>
          {children}
        </div>
      </div>
    );
  }