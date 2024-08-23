import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const InputForm = ({ children, type, name, onChange }) => {
  return (
    <div
      className={`bg-greybg w-full font-poppins rounded-[8px] w-full flex`}
    >
      {children && <p className="p-4">{children}</p>}
      <input
        type={type}
        placeholder={name}
        className="p-4 bg-greybg w-full text-base gf:text-[12px] gf:p-2 sg:text-[16px]"
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
  },
);
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
