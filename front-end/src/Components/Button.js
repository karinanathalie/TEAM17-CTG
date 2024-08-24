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
        className="w-full h-full text-buttonyellow text-[15px] font-poppins font-semibold hover:cursor-pointer"
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

export const ButtonLove = ({ onClick }) => {
  return (
    <button
      className="w-fit bg-red rounded-full ss:p-4 fs:p-3 font-poppins font-semibold"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-7 h-7 active:fill-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

export const XButton = ({ onClick }) => {
  return (
    <button
      className="bg-white rounded-full p-2 text-xl font-poppins font-semibold"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
