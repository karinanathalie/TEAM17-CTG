import React from "react";
import { InputForm } from "./Input";
import { XButton } from "./Button";
import im1 from "../Components/event.png";

const Profile = ({onClick}) => {
  return (
    <div className="absolute mt-[-50px] bg-black w-[600px] h-[900px]">
      <XButton onClick={onClick}/>
      <div className="items-center justify-center flex flex-col mt-[70px]">
        <img src={im1} className="rounded-full    w-[209px] h-[209px]"></img>
      </div>
      <h1 className="text-white mt-[13%] text-center font-poppins text-[30px] font-semibold">
        Shannon Santosa
      </h1>
      <h1 className="text-white text-center font-poppins text-[16px] font-medium">
        +852 XXXX-XXXX
      </h1>
      <div className=" justify-center flex gap-8 mt-[3%]">
        <div>
          <h1 className="font-semibold text-center text-[#FCFFB5] text-[32px]">
            20
          </h1>
          <h1 className="text-white">Volunteer</h1>
        </div>
        <div className="vl"></div>
        <div>
          <h1 className="font-semibold text-[#66CBEC] text-center text-[32px]">
            18
          </h1>
          <h1 className="text-white">Participant</h1>
        </div>
      </div>
      <div className="mt-[5%] flex flex-col items-center justify-center ">
        <InputForm
          type={"text"}
          name={"Gender"}
          className="rounded-xl"
        ></InputForm>
        <InputForm type={"text"} name={"Nationality"}></InputForm>
        <InputForm type={"text"} name={"What i don't know"}></InputForm>
      </div>
      <div className="flex flex-col items-center justify-center mt-[5%] flex">
        <button className=" bg-[#FCFFB5] mt-[3%] text-black rounded-[8px] w-[185px] h-[34px]">
          save
        </button>
      </div>
    </div>
  );
};

export default Profile;
