import { React, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ButtonFullFixed, XButton } from "./Button.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../index.css";
import { InputPasswordlogin, Inputlogin } from "./Input.js";

const LoginComponent = () => {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  
  function handleSignUp(e){
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    e.preventDefault();
    // making a request to the endpoint
    fetch('http://localhost:8000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // enabling change in the cookies
        'credentials': 'include'
      },
      body: JSON.stringify(data)
    }).then(async (res) => {
      if (res.status == 200) {
          window.location.href = '/'; // redirect to the home page
      } else {
          // if the fetch is unsuccessful, display an error message
          alert(await res.json().then(data => data.message));
      }
    })
  }

  function handleLogin(e){
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    e.preventDefault();
    // making a request to the endpoint
    fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // enabling change in the cookies
        // 'credentials': 'include'
      },
      body: JSON.stringify(data)
    }).then(async (res) => {
      if (res.status == 200) {
          window.location.href = '/home'; // redirect to the home page
      } else {
          // if the fetch is unsuccessful, display an error message
          alert(await res.json().then(data => data.message));
      }
    })
  }

  return (
    <div>
      <div>
        <button onClick={() => setOpenFirst(true)} className="font-poppins font-semibold bg-blue px-[64px] py-[16px] rounded-[16px]">
          Log In
        </button>

        <Modal
          open={openFirst}
          onClose={() => setOpenFirst(false)}
          center
          classNames={{
            modal: "w-[400px] h-[370px] rounded-3xl bg-black ",
            closeButton: "fill-white",
          }}
        >
          <form className="h-full w-full relative" onSubmit={handleLogin}>
            <div>
              <h1 className=" font-bold text-xl text-center">Log In</h1>
              <h1 className="font-bold mt-[10%]">Username</h1>
              <Inputlogin type={"text"} name={"username"}></Inputlogin>
              <h1 className="font-bold mt-[4%]">Password</h1>
              <InputPasswordlogin name={"password"}></InputPasswordlogin>
              <button className="w-full mt-[3%] bg-black text-white rounded-2xl">
                Log In
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
            modal: "w-[400px] h-[550px] rounded-3xl fill-black ",
            closeButton: "fill-black",
          }}
        >
          <form className="h-full w-full relative" onSubmit={handleSignUp}>
            <div>
              <h1 className="font-bold text-xl text-center">Sign Up</h1>
              <h1 className="font-bold mt-[10%]">Username</h1>
              <Inputlogin type={"text"} name={"username"}></Inputlogin>
              <h1 className="font-bold mt-[2%]">Nationality</h1>
              <Inputlogin type={"text"} name={"nationality"}></Inputlogin>
              <h1 className="font-bold mt-[2%]">Gender</h1>
              <Inputlogin type={"text"} name={"gender"}></Inputlogin>
                <h1 className="font-bold mt-[2%]">Phone</h1>
              <Inputlogin type={"text"} name={"phone"}></Inputlogin>
              <h1 className="font-bold mt-[2%]">Email</h1>
              <Inputlogin type={"text"} name={"email"}></Inputlogin>
              <h1 className="font-bold mt-[5%]">Password</h1>
              <InputPasswordlogin name={"password"}></InputPasswordlogin>
        
              <button className="w-[100%] mt-[3%] bg-black text-white rounded-2xl" >
                Sign Up
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default LoginComponent;
