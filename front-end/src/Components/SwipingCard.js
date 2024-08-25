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

export const SwipingCard = ({ distance }) => {
    const [list_of_events, set_list_of_events] = useState([]);
    useEffect(() => {
        // fetching the event details from the backend
        let backend_base = "http://localhost:8000/";
        fetch(backend_base + "api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (res) => {
          if (res.status == 200) {
            // if the fetch is successful update the eventDetails json object
            set_list_of_events(
              await res.json().then((data) => data.map((event) => event.fields))
            );
          } else {
            // if the fetch is unsuccessful, display an error message
            alert("Internal Server Error");
          }
        });
      }, []);
    

    const [curr_index, setIndex] = useState(0);

    const RoutetoIndividualEvent = () => {
        console.log("RoutetoIndividualEvent");
    };

    const SkipEvent = () => {
        setIndex(curr_index + 1);
    };

    let current_event = list_of_events[curr_index];

    return (
        <div className="p-[34px] flex flex-col w-[450px] h-[700px] rounded-[16px] justify-center font-poppins bg-darkgray text-gray">
        <div className="text-[28px] font-regular text-center mb-[33px]">
            Find the most suitable events{" "}
            <span className="text-pastelyellow"> near you! </span>
        </div>
        <div className="flex justify-center">
            <CarousellCard
            onClickOther={SkipEvent}
            onClickRegis={RoutetoIndividualEvent}
            date={current_event.event_date}
            location={current_event.event_location}
            distance="2 KM"
            eventPicture={current_event.event_picture}
            eventName={current_event.event_name}
            />
        </div>
        </div>
    );
};
