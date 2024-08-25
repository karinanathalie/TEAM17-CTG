import React from 'react';
import LoginComponent from '../Components/login.jsx';
import Logo from "../img/zubin.png";

export default function Login() {
    return (
        <div className="m-[24px] items-center">
            <img src={Logo} className="w-100 h-100" />
            <h1 className="text-[48px] font-semibold"> The Zubin Foundation </h1>
            <LoginComponent />
        </div>
    );
}