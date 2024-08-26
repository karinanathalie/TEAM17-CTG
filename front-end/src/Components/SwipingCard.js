import { React, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CarousellCard } from "./Cards";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const SwipingCard = ({ distance }) => {
  const [list_of_events, set_list_of_events] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    fetch("http://0.0.0.0:8000/api/events/")
      .then((response) => response.json())
      .then((data) => {
        const eventRows = data.map((item) => ({
          id: item.pk,
          ...item.fields,
        }));
        set_list_of_events(eventRows);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const [curr_index, setIndex] = useState(0);

  const history = useHistory();

  const RoutetoIndividualEvent = () => {
    history.push("/myregistration");
    console.log("RoutetoIndividualEvent");
  };

  const SkipEvent = async () => {
    await controls.start({ opacity: 0 }); // Fade out
    setIndex(curr_index + 1);
    controls.set({ opacity: 1 }); // Reset opacity for the next event
  };

  let current_event = list_of_events[curr_index];

  return (
    <div className="p-[34px] flex flex-col w-[450px] h-[700px] rounded-[16px] justify-center font-poppins bg-darkgray text-gray">
      <div className="text-[28px] font-regular text-center mb-[33px]">
        Find the most suitable events{" "}
        <span className="text-pastelyellow">near you!</span>
      </div>
      {current_event && (
        <motion.div
          className="flex justify-center"
          animate={controls} // Use the animation controls
          initial={{ opacity: 1 }} // Initial opacity
        >
          <CarousellCard
            onClickOther={SkipEvent}
            onClickRegis={RoutetoIndividualEvent}
            date={current_event.event_date}
            location={current_event.event_location}
            distance="2 KM"
            eventPicture={current_event.event_image}
            eventName={current_event.event_name}
          />
        </motion.div>
      )}
    </div>
  );
};

// import React from "react";
// import { useState, useEffect } from "react";
// import {
//   motion,
//   useMotionValue,
//   useTransform,
//   useAnimation,
// } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { CarousellCard } from "./Cards";

// export const SwipingCard = ({ distance }) => {
//     const [list_of_events, set_list_of_events] = useState([]);
//       useEffect(() => {
//         fetch('http://0.0.0.0:8000/api/events/')
//           .then((response) => response.json())
//           .then((data) => {
//               console.log('here is data', data)
//               const eventRows = data.map((item) => ({
//                   id: item.pk,
//                   ...item.fields,
//               }));
//               set_list_of_events(eventRows);
//           })
//           .catch((error) => console.error('Error fetching events:', error));
//     }, []);

//         console.log(list_of_events);

//     const [curr_index, setIndex] = useState(0);

//     const RoutetoIndividualEvent = () => {
//         console.log("RoutetoIndividualEvent");
//     };

//     const SkipEvent = () => {
//         setIndex(curr_index + 1);
//     };

//     let current_event = list_of_events[curr_index];

//     // console.log("picture", current_event.event_picture);
//     return (
//         <div className="p-[34px] flex flex-col w-[450px] h-[700px] rounded-[16px] justify-center font-poppins bg-darkgray text-gray">
//         <div className="text-[28px] font-regular text-center mb-[33px]">
//             Find the most suitable events{" "}
//             <span className="text-pastelyellow"> near you! </span>
//         </div>
//         {current_event &&
//         <div className="flex justify-center">
//             <CarousellCard
//             onClickOther={SkipEvent}
//             onClickRegis={RoutetoIndividualEvent}
//             date={current_event.event_date}
//             location={current_event.event_location}
//             distance="2 KM"
//             eventPicture={current_event.event_image}
//             eventName={current_event.event_name}
//             />
//         </div>
//         }
//         </div>
//     );
// };
