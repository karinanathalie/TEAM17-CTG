import React from "react";
import im1 from "./event.png";

const Events = ({ item }) => {
  console.log(item);
  const dateObj = new Date(item.event_date);
  const day = dateObj.getDate();
  const monthNumber = dateObj.getMonth() + 1; // Months are zero-indexed
  const year = dateObj.getFullYear();

   const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE',
    'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const month = monthNames[monthNumber];

  return (
    <div className="font-poppins">
      <div className="rounded-3xl shadow-md h-[350px] w-[340px]  items-center">
       <img
        src={`http://localhost:8000/api/pic/${item.event_image}`}
        alt={item.event_name}
        className="w-full h-[197px] rounded-t-3xl"
      /> 
        <div className="flex mt-[5%]">
          <div className="w-[100px] items-center">
            <h1 className="text-center text-[16px] text-[#923417] font-semibold">
              {month}
            </h1>
            <h1 className="text-center text-[28px] font-medium">{day}</h1>
          </div>
          <div>
            <h1 className="font-poppins font-semibold text-[18px]">{item.event_name}</h1>
            <h1 className="font-medium text-gray text-[14px]">{item.event_description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
