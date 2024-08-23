import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export default function SideBar({ children }) {

    return (
      <div className='flex flex-row'>
        <div className=" mx-[30px] mt-[40px] sidebar w-[350px] h-full bg-white" style={{ width: '400px' }}>
        <div className='my-[5px]'>
            <img src='http://placehold.it/250x80'></img>
        </div>
          <nav>
            <ul>
              <li className='my-[7x] font-[700] py-[5px]'>
                <HomeOutlinedIcon />
                <NavLink to="/home" className="ml-[15px]" activeClassName="active-link">
                  Home
                </NavLink>
              </li>
              <li className='my-[7x] font-[700] py-[5px]'>
                <BarChartOutlinedIcon />
                <NavLink to="/events" className="ml-[15px]" activeClassName="active-link">
                  Events
                </NavLink>
              </li>
              <li className='my-[7x] font-[700] py-[5px]'>
                <InfoOutlinedIcon />
                <NavLink to="/about" className="ml-[15px]" activeClassName="active-link">
                  About
                </NavLink>
              </li>
              <li className='my-[7x] font-[700] py-[5px]'>
                <PermIdentityOutlinedIcon />
                <NavLink to="/user" className="ml-[15px]" activeClassName="active-link">
                  User
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className='w-full h-full'>
          {children}
        </div>
      </div>
    );
  }