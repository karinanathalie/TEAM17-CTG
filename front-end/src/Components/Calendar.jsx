import { React, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";

const Calendarr = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <div className="font-poppins flex justify-center w-[100%] flex-col items-center ">
        <Calendar onChange={setDate} value={date}></Calendar>
        <p className="text-center font-poppins">
          <span className=" font-bold text-xs font-poppins">
            {date.toDateString()}
          </span>
          : event name
        </p>
      </div>
    </div>
  );
};

export default Calendarr;
