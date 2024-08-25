import React, { useState } from "react";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

export const InputForm = ({ children, type, name, onChange }) => {
  return (
    <div className="bg-grayinput w-[320px] rounded-[6px] flex text-white text-[12px] mb-[16px]">
      {children && <p className="p-3 mx-2">{children}</p>}
      <input
        type={type}
        placeholder={name}
        className="p-2 bg-grayinput text-white h-[48px] text-[14px] placeholder-lightgray rounded-[8px] w-[320px]"
        onChange={onChange}
      ></input>
    </div>
  );
};

export const TextArea = ({ children, type, name, onChange }) => {
  return (
    <div className="bg-grayinput w-full h-full rounded-[6px] flex text-white text-[12px] mb-[16px]">
      {children && <p className="p-3 mx-2">{children}</p>}
      <textarea
        rows="6"
        className="bg-grayinput h-full text-white w-full rounded-[6px] p-4 placeholder-lightgray"
      >
        {" "}
      </textarea>
    </div>
  );
};

export const FileUpload = ({ onChange }) => {
  return (
    <div className="w-full mb-4 bg-grayinput rounded-[6px] border-2 border-dashed border-lightgray p-4 flex items-center justify-center cursor-pointer">
      <label
        htmlFor="pdf-upload"
        className="flex flex-col items-center space-y-2"
      >
        <AiOutlineCloudUpload className="text-lightgray text-4xl" />
        <span className="text-lightgray text-[12px]">Upload PDF File</span>
      </label>
      <input
        type="file"
        id="pdf-upload"
        name="pdf-upload"
        accept=".pdf"
        onChange={onChange}
        className="hidden"
      />
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
export const InputSearchu = React.forwardRef(
  ({ children, type, name, onChange, value }, ref) => {
    return (
      <div className={` w-[350px] font-poppins font-white rounded-[8px] flex`}>
        <div className="ml-[-400px] mt-[6%] z-10">
          {" "}
          <CiSearch className="pl-[-400px]" />
        </div>

        <input
          type={type}
          placeholder={name}
          className="text-[#6A6A6A] z-0 placeholder-[#6A6A6A] ml-[-70px] rounded-lg h-[58px] bg-[#C4C4C4] w-[400px] text-center text-base "
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
        name={name}
        type={type}
        placeholder={name}
        className="pl-[1%] bg-white border rounded-xl text-left text-black w-[100%] h-[30px]"
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
        name={name}
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
