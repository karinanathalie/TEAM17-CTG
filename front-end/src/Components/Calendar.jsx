import { React, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";

const Calendarr = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <div className="flex justify-center w-[30%] bg-yellow  flex-col items-center ">
        <Calendar
          onChange={setDate}
          value={date}
          className="bg-black"
        ></Calendar>
        <p className="text-center font-poppins">
          <span className=" font-bold text-l font-poppins">
            {date.toDateString()}
          </span>
          : event name
        </p>
      </div>
    </div>
  );
};

export default Calendarr;
