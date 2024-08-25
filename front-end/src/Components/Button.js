import React from "react";
import { CiLocationOn } from "react-icons/ci";

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

export const ButtonFullRoleBased = ({ onClick, children, role }) => {
  // Determine the text color based on the role
  const textColor = role === 'Participant' ? 'text-buttonyellow' : 
                    role === 'Volunteer' ? 'text-blue' : 
                    'text-gray-500'; // Default color if role is not matched

  return (
    <div className="flex justify-center w-[146px] h-[36px] rounded-[8px] bg-buttonblack hover:bg-buttonblackhover hover:drop-shadow-lg active:drop-shadow-none">
      <button
        className={`w-full h-full text-[15px] font-poppins font-semibold hover:cursor-pointer ${textColor}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export const ButtonYellow = ({ onClick, children}) => {
  return (
    <div className="flex justify-center w-[146px] h-[36px] rounded-[8px] bg-buttonyellow hover:bg-buttonblackhover hover:drop-shadow-lg active:drop-shadow-none">
      <button
        className="w-full h-full text-black text-[15px] font-poppins font-semibold hover:cursor-pointer"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export const ButtonBlue = ({ onClick, children}) => {
  return (
    <div className="flex justify-center w-[146px] h-[36px] rounded-[8px] bg-blue hover:bg-buttonblackhover hover:drop-shadow-lg active:drop-shadow-none">
      <button
        className="w-full h-full text-black text-[15px] font-poppins font-semibold hover:cursor-pointer"
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
    <button className="font-poppins flex space-x-[10px] w-[135px] h-[48px] px-[21px] py-[10px] rounded-[8px] bg-buttonblack hover:drop-shadow-lg active:drop-shadow-none" onClick={onClick}>
      <div className=" font-medium text-[20px] text-white">&lt;</div>
      <div className="font-medium text-[20px] text-white">Back</div>
    </button>
  );
};


export const VolunteerParticipantToggle = ({ onClick }) => {
  // Using checkbox, if not checked, volunteer. Else, participants.
  return (
    <label className="font-poppins relative flex justify-center items-center w-[289px] h-[50px] rounded-[8px] cursor-pointer peer">
      <input type="checkbox" className="sr-only peer" onClick={onClick}/>
      <div className="absolute bg-gray inset-0 peer-checked:bg-blue-600 transition-colors duration-100 rounded-[8px]"></div>
      <div className="absolute left-[6px] top-[7px] bg-buttonblack border border-gray-300 rounded-[8px] h-[36px] w-[123px] transition-transform duration-200 transform peer-checked:translate-x-[153px] z-0"></div>
      <span className="flex flex-col justify-center z-10 px-[40px] relative text-pastelyellow font-semibold dark:text-gray-300 peer-checked:text-black">Volunteer</span>
      <span className="flex flex-col justify-center z-10 px-[40px] relative text-black font-semibold dark:text-gray-300 peer-checked:text-blue">Participant</span>
    </label>
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

export const ButtonAccount = ({ text }) => {
  return(
    <div className="w-full flex flex-row-reverse h-auto">
      <div className="mb-4 flex bg-lightgray h-[80px] rounded-[16px] w-[350px]">
        <div className="flex p-4 text-[18px] font-semibold">
            <div className="w-10 h-10 bg-gray rounded-full flex items-center justify-center text-white font-bold">
                IMG
            </div>
            <div className="ml-4">
                <div> Vanessa Laurel </div>
                <div className="flex text-[14px] font-medium text-darkgray">
                  <CiLocationOn className="h-6 w-6 mr-2" />
                  Location away
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}


