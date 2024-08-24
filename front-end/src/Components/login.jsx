import { React, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ButtonFullFixed, XButton } from "./Button.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../index.css";
import { InputPasswordlogin, Inputlogin } from "./Input.js";

const Login = () => {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div>
      <div>
        <button onClick={() => setOpenFirst(true)} className="bg-blue">
          Log In
        </button>

        <Modal
          open={openFirst}
          onClose={() => setOpenFirst(false)}
          center
          classNames={{
            modal: "w-[400px] h-[420px] rounded-3xl bg-black ",
            closeButton: "fill-white",
          }}
        >
          <form className="h-full w-full relative  ">
            <div>
              <h1 className=" font-bold text-xl text-center">Log In</h1>
              <h1 className="font-bold mt-[10%]">Email</h1>
              <Inputlogin type={"text"} name={"Email"}></Inputlogin>
              <h1 className="font-bold mt-[4%]">Password</h1>
              <InputPasswordlogin name={"password"}></InputPasswordlogin>
              <button className="w-full mt-[3%] bg-black text-white rounded-2xl">
                Log In
              </button>
              <h1 className=" text-center font-semibold mt-[3%] text-sm">Or</h1>
              <button className="border mt-[2%] w-full">
                <span>Log in with Google</span>
              </button>
              <button className="border mt-[1%] w-full">
                Log in with Facebook
              </button>
              <div className="flex justify-center gap-2 mt-[10%]">
                <h1 className="text-center">don't have any account? </h1>
                <h1
                  onClick={() => setOpenSecond(true)}
                  className="font-semibold text-brown cursor-pointer"
                >
                  Sign up
                </h1>
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          open={openSecond}
          onClose={() => setOpenSecond(false)}
          center
          classNames={{
            modal: "w-[400px] h-[420px] rounded-3xl fill-black ",
            closeButton: "fill-black",
          }}
        >
          <form className="h-full w-full relative  ">
            <div>
              <h1 className=" font-bold text-xl text-center">Sign Up</h1>
              <h1 className="font-bold mt-[10%]">Username</h1>
              <Inputlogin type={"text"} name={"Username"}></Inputlogin>
              <h1 className="font-bold mt-[2%]">Nationality</h1>
              <Inputlogin type={"text"} name={"Nationality"}></Inputlogin>
              <h1 className="font-bold mt-[2%]">Gender</h1>
              <Inputlogin type={"text"} name={"Gender"}></Inputlogin>
              <h1 className="font-bold mt-[2%]">Email</h1>
              <Inputlogin type={"text"} name={"Email"}></Inputlogin>
              <h1 className="font-bold mt-[5%]">Password</h1>
              <InputPasswordlogin name={"password"}></InputPasswordlogin>
              <button className="w-[100%] mt-[3%] bg-black text-white rounded-2xl">
                Sign Up
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
