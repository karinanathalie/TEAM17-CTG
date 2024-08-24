import React from "react";

export const ButtonFull = ({ onClick, children }) => {
  return (
    <div className="flex justify-center w-[146px] h-[36px] rounded-[8px] bg-buttonblack hover:bg-buttonblackhover hover:drop-shadow-lg active:drop-shadow-none">
      <button
        className="w-full h-full text-buttonyellow text-[15px] font-poppins font-semibold hover:cursor-pointer"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};


export const ButtonFull2 = ({ onClick, children }) => {
  return (
    <div className="flex justify-center w-[146px] h-[36px] rounded-[8px] bg-gray hover:bg-lightgray hover:drop-shadow-lg active:drop-shadow-none">
      <button
        className="w-full h-full text-black text-[15px] font-poppins font-semibold hover:cursor-pointer"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};


export const ButtonFullFixed = ({ onClick, children }) => {
  return (
    <div className="fixed bottom-16 left-3 right-3 flex justify-around bg-red rounded-[32px] items-center w-5/6 mx-auto">
      <button
        className="w-full bg-red rounded-full text-white p-6 pt-4 pb-4 text-xl font-poppins font-semibold"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export const BackButton = ({ onClick }) => {
  return (
    <button className="w-fit bg-greybg p-4 rounded-full" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>
  );
};

export const ButtonSocial = ({ icon, text }) => {
  return (
    <button className="w-full border border-grey rounded-full text-grey p-6 text-xl font-poppins font-medium">
      <div className="flex space-x-4 ml-8 place-items-center h-2">
        <div className="text-2xl">{icon}</div>
        <div>{text}</div>
      </div>
    </button>
  );
};


