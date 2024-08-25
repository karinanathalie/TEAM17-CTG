import React from 'react';
import LoginComponent from '../Components/login.jsx';
import MacDisplay from "../img/macDisplay.png";

export default function Login() {
    return (
        <div className="font-poppins absolute left-0 w-[1600px] h-screen bg-black z-50 w-full flex flex-cols justify-center">
            <div className="h-full text-white z-50 text-center m-[40px] place-self-center ">
            <div className="flex justify-center mt-[128px]">
                <img src={MacDisplay} className="w-[450px] my-[32px]" />
            </div>
            <div>
                <h1 className="text-[48px] font-semibold"> The Zubin Foundation </h1>
            </div>
            <div className="m-[24px] w-[800px]">
                Our mission is to improve the lives of Hong Kong’s ethnic minorities by reducing suffering and providing opportunities.
We do this through direct outreach into the community and by driving systemic change.

Our target audience comprises of low-income ethnic minorities in Hong Kong. Most are Hong Kong Indians, Pakistanis, Nepalis and Filipinos.
            </div>
            <LoginComponent />
        </div>
        </div>
        
    );
}