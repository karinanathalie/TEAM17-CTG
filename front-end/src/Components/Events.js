import React from "react";

const Events = ({ item }) => {
  return (
    <div>
      <div className=" ml-[40%] rounded-3xl shadow-md h-[350px] w-[343px]  items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[197px] rounded-t-3xl"
        />
        <div className="flex mt-[5%] gap-2">
          <div className="w-[100px] items-center ">
            <h1 className="text-center text-[12px] text-[#923417]">
              {item.month}
            </h1>
            <h1 className="text-center text-[20px] font-bold">{item.date}</h1>
          </div>
          <div>
            <h1 className="font-poppins font-bold">{item.name}</h1>
            <h1 className="font-light">{item.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
