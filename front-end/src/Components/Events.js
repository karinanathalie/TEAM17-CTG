import React from "react";

const Events = ({ item }) => {
  return (
    <div className="font-poppins">
      <div className="rounded-3xl shadow-md h-[350px] w-[343px]  items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[197px] rounded-t-3xl"
        />
        <div className="flex mt-[5%] gap-2">
          <div className="w-[100px] items-center ">
            <h1 className="text-center text-[12px] text-blue font-poppins font-semibold">
              {item.month}
            </h1>
            <h1 className="text-center text-[20px] font-bold">{item.date}</h1>
          </div>
          <div>
            <h1 className="font-poppins font-bold text-[20px]">{item.name}</h1>
            <h1 className="font-medium">{item.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
