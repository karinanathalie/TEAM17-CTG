import { React, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../index.css";

const Calendarr = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <div className="font-poppins flex justify-center w-[30%] flex-col items-center ">
        <Calendar
          onChange={setDate}
          value={date}
          className="react-calendar"
        ></Calendar>
        <p className="text-center">
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
