import React from "react";
import { useState, useEffect } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useAnimation,
  } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { CarousellCard } from "./Cards";


export const SwipingCard = () => {

    const[curr_index, setIndex] = useState(1);

    const RoutetoIndividualEvent = () => {
        console.log("RoutetoIndividualEvent");
    };

    const SkipEvent = () => {
        setIndex(curr_index + 1);
    };



    return(
        <div className="p-[34px] flex flex-col w-[399px] h-[671px] rounded-[16px] justify-center font-poppins bg-darkgray text-gray">
            <div className="text-[28px] font-regular text-center mb-[33px]">
                Find the most suitable events <span className="text-pastelyellow"> near you! </span>
            </div>
            <div className="flex justify-center">
                <CarousellCard onClickOther={SkipEvent} onClickRegis={RoutetoIndividualEvent} date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" />
            </div>
        </div>
    )
}