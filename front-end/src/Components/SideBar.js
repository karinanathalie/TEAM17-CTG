import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../img/zubin.png";
import {
  HomeIcon,
  ChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

export default function SideBar({ children }) {
  const location = useLocation();

  const [active_link, set_active_link] = useState("home");
  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    set_active_link(pathname);
  }, []);

  return (
    <div className="fixed top-0 font-poppins flex flex-row rounded-full h-screen">
      <div className="bg-darkgray rounded-r-2xl h-full">
        <div className=" mx-[30px] mt-[40px] sidebar w-[250px] text-white">
          <div className="my-[5px] mb-[20px] flex">
            <img src={Logo} className="w-20 h-20" />
            <div className="font-semibold ml-[16px] text-[20px] mt-[10px]"> The Zubin Foundation </div>
            
          </div>
          <nav>
            <ul>
              <li className="ml-[10px] mb-[15px] font-[500]">
                <div
                  className={
                    active_link != "home"
                      ? "bg-darkgray text-white py-[10px] rounded-xl"
                      : "bg-white text-black py-[10px] px-[10px] rounded-xl"
                  }
                >
                  <div className="flex">
                    <HomeIcon class="h-6 w-6" />
                    <Link
                      to="/home"
                      className="ml-[15px]"
                      onClick={() => {
                        set_active_link("home");
                      }}
                    >
                      Home
                    </Link>
                  </div>
                </div>
              </li>
              <li className="ml-[10px] mb-[15px] font-[500]">
                <div
                  className={
                    active_link != "events"
                      ? "bg-darkgray text-white py-[10px] rounded-xl"
                      : "bg-white text-black py-[10px] px-[10px] rounded-xl"
                  }
                >
                  <div className="flex">
                    <ChartBarIcon class="h-6 w-6" />
                    <Link
                      to="/events"
                      className="ml-[15px]"
                      onClick={() => {
                        set_active_link("events");
                      }}
                    >
                      Events
                    </Link>
                  </div>
                </div>
              </li>
              <li className="ml-[10px] mb-[15px] font-[500]">
                <div
                  className={
                    active_link != "myregistration"
                      ? "bg-darkgray text-white py-[10px] rounded-xl"
                      : "bg-white text-black py-[10px] px-[10px] rounded-xl"
                  }
                >
                  <div className="flex">
                    <InformationCircleIcon class="h-6 w-6" />
                    <Link
                      to="/myregistration"
                      className="ml-[15px]"
                      onClick={() => {
                        set_active_link("myregistration");
                      }}
                    >
                      My Registration
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
