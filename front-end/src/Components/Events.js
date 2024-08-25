import React from "react";
import im1 from "./event.png";

const Events = ({ item }) => {
  console.log(item);
  return (
    <div className="font-poppins">
      <div className="rounded-3xl shadow-md h-[350px] w-[343px]  items-center">
        <img
          src={im1}
          alt={item.event_name}
          className="w-full h-[197px] rounded-t-3xl"
        />
        <div className="flex mt-[5%] gap-2">
          <div className="w-[100px] items-center">
            <h1 className="text-center text-[12px] text-[#923417]">
              {item.event_month}
            </h1>
            <h1 className="text-center text-[20px] font-bold">{item.event_date}</h1>
          </div>
          <div>
            <h1 className="font-poppins font-bold">{item.event_name}</h1>
            <h1 className="font-light">{item.event_description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
