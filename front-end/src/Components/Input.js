import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const InputForm = ({ children, type, name, onChange }) => {
  return (
    <div className="bg-grayinput w-full rounded-[6px] flex text-white text-[12px] mb-[16px]">
      {children && <p className="p-3 mx-2">{children}</p>}
      <input
        type={type}
        placeholder={name}
        className="p-2 bg-grayinput text-white text-[14px] placeholder-lightgray"
        onChange={onChange}
      ></input>
    </div>
  );
};

export const InputSearch = React.forwardRef(
  ({ children, type, name, onChange, value }, ref) => {
    return (
      <div
        className={`bg-greybg w-full font-poppins rounded-[8px] w-full flex`}
      >
        {children && <p className="p-4">{children}</p>}
        <input
          type={type}
          placeholder={name}
          className="p-2 pl-1 bg-greybg w-full text-base sg:text-[16px]"
          onChange={onChange}
          value={value}
          ref={ref}
        />
      </div>
    );
  }
);
export const Inputlogin = React.forwardRef(({ type, name }) => {
  return (
    <div className={`h-full w-[95%]`}>
      <input
        type={type}
        placeholder={name}
        className="pl-[1%] bg-white  border  rounded-xl text-left text-black w-[100%] h-[30px]"
        // onChange={onChange}
        // value={value}
      />
    </div>
  );
});

export const InputPassword = ({ children, name, onChange }) => {
  const [ShowStatus, setStatus] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setStatus(!ShowStatus);
  };

  const icon = ShowStatus ? (
    <AiFillEye className="w-[50px]" />
  ) : (
    <AiFillEyeInvisible className="w-[50px]" />
  );

  return (
    <div className="flex items-center bg-greybg w-full font-poppins rounded-[8px] w-full">
      <p className="p-4">{children}</p>
      <input
        type={ShowStatus ? "text" : "password"}
        placeholder={name}
        className="p-2 bg-greybg w-full text-base gf:text-[12px] sg:text-[16px]"
        onChange={onChange}
      ></input>
      <button onClick={handleClick}>{icon}</button>
    </div>
  );
};

export const InputPasswordlogin = ({ name }) => {
  const [ShowStatus, setStatus] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setStatus(!ShowStatus);
  };

  const icon = ShowStatus ? (
    <AiFillEye className="h-full w-full" />
  ) : (
    <AiFillEyeInvisible className="h-full w-full" />
  );

  return (
    <div className="h-full w-[100%]">
      <input
        type={ShowStatus ? "text" : "password"}
        placeholder={name}
        className="pl-[1%] bg-white border  rounded-xl text-left text-black w-full h-[30px]"
        // onChange={onChange}
      ></input>
      <button
        onClick={handleClick}
        className="cursor-pointer w-[24px] h-[24px] absolute mt-[-7%] ml-[7%] right-[1%]"
      >
        {icon}
      </button>
    </div>
  );
};
