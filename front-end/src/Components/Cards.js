import { React, useState, useMemo, useRef } from "react";
import { ButtonFull, ButtonFull2, ButtonFullRoleBased } from "./Button";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import im1 from "../Components/event.png";
import TinderCard from "react-tinder-card";
export const ScheduleCard = ({ date, eventName, eventSummary }) => {
  const SplittedDate = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const colours = ["pastelyellow", "lightgreen", "lightblue"];
  const monthIndex = parseInt(SplittedDate[1], 10) - 1;
  const month = months[monthIndex];
  const day = SplittedDate[0];

  const randomColour = colours[Math.floor(Math.random() * colours.length)];

  return (
    <div className="flex w-[236px] h-[54px] rounded-[8px] bg-lightgray">
      <div className="flex flex-col w-[56px] h-[54px] px-[13px] bg-buttonblack rounded-[8px]">
        <div className="flex justify-center font-semibold text-pastelyellow text-[24px]">
          {day}
        </div>
        <div className="flex justify-center font-semibold text-gray text-[8px]">
          {month}
        </div>
      </div>
      <div className="flex flex-col mx-[15px] my-[13px]">
        <div className="font-semibold text-[10px]">{eventName}</div>
        <div className="font-medium text-darkgray text-[8px]">
          {eventSummary}
        </div>
      </div>
    </div>
  );
};

export const CarousellCard = ({ date, location, eventPicture, eventName }) => {
  const SplittedDate = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(SplittedDate[1], 10) - 1;
  const month = months[monthIndex];
  const day = SplittedDate[0];
  const dayname = new Date(date).toLocaleString("en-us", { weekday: "long" });
  const year = SplittedDate[2];

  return (
    <div className=" ml-[4%] flex flex-col w-[342px] h-[469px] rounded-[16px] p-[24px] bg-white">
      <div className="flex w-[302px]] h-[249px] rounded-[16px] bg-lightgray">
        <img
          src={eventPicture}
          alt="event"
          className="w-full h-full object-cover rounded-t-[16px]"
        />
      </div>
      <div className="py-[30px]">
        <div className="font-semibold text-[16px]">{eventName}</div>
        <div className="flex space-x-[12px] font-medium text-[15px] text-mediumgray">
          <div className="flex flex-col justify-center">
            <CiCalendarDate />
          </div>
          <div>
            {dayname}, {day} {month} {year}
          </div>
        </div>
        <div className="flex space-x-[12px] font-medium text-[15px] text-mediumgray">
          <div className="flex flex-col justify-center">
            <CiLocationOn />
          </div>
          <div>{location}</div>
        </div>
      </div>
      <div className="flex space-x-[10px]">
        <ButtonFull2>Other Event</ButtonFull2>
        <ButtonFull>Register</ButtonFull>
      </div>
    </div>
  );
};

export const CarousellCards = () => {
  const cards = [
    {
      id: 1,
      image: im1,
      date: "12-07-2003",
      location: "Hong Kong",
      eventName: "Hello World",
      eventSummary: "Hello World Lorem Ipsum",
    },
    {
      id: 2,
      image: im1,
      date: "14-07-2003",
      location: "Hong Kong",
      eventName: "Hello World",
      eventSummary: "Hello World Lorem Ipsum",
    },
    {
      id: 3,
      image: im1,
      date: "13-07-2003",
      location: "Hong Kong",
      eventName: "Hello World",
      eventSummary: "Hello World Lorem Ipsum",
    },
    {
      id: 4,
      image: im1,
      date: "15-07-2003",
      location: "Hong Kong",
      eventName: "Hello World",
      eventSummary: "Hello World Lorem Ipsum",
    },
  ];
  const [lastDirection, setLastDirection] = useState();
  const cardRefs = useRef([]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const handleSwipeLeft = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].swipe("left");
    }
  };

  return (
    <div className="h-[500px] w-[400px] relative overflow-hidden">
      {cards.map((card, index) => {
        const SplittedDate = card.date.split("-");
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthIndex = parseInt(SplittedDate[1], 10) - 1;
        const month = months[monthIndex];
        const day = SplittedDate[0];
        const dayname = new Date(card.date).toLocaleString("en-us", {
          weekday: "long",
        });
        const year = SplittedDate[2];

        return (
          <TinderCard
            className="swipe"
            key={card.id}
            onSwipe={(dir) => swiped(dir, card.id)}
            onCardLeftScreen={() => outOfFrame(card.id)}
          >
            <div className="ml-[4%] flex flex-col w-[342px] h-[469px] rounded-[16px] p-[24px] bg-white">
              <div className="flex w-[302px] h-[249px] rounded-[16px] bg-lightgray">
                <img
                  src={card.image}
                  alt="event"
                  className="w-full h-full object-cover rounded-t-[16px]"
                />
              </div>
              <div className="py-[30px]">
                <div className="font-semibold text-[16px]">
                  {card.eventName}
                </div>
                <div className="flex space-x-[12px] font-medium text-[15px] text-mediumgray">
                  <div className="flex flex-col justify-center">
                    <CiCalendarDate />
                  </div>
                  <div>
                    {dayname}, {day} {month} {year}
                  </div>
                </div>
                <div className="flex space-x-[12px] font-medium text-[15px] text-mediumgray">
                  <div className="flex flex-col justify-center">
                    <CiLocationOn />
                  </div>
                  <div>{card.location}</div>
                </div>
              </div>
              <div className="flex space-x-[10px]">
                <button onClick={() => handleSwipeLeft(index)}>
                  Other Event
                </button>
                <ButtonFull>Register</ButtonFull>
              </div>
            </div>
          </TinderCard>
        );
      })}
    </div>
  );
};

export const EventCard = ({
  date,
  location,
  eventPicture,
  eventName,
  eventSummary,
  role,
}) => {
  const SplittedDate = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(SplittedDate[1], 10) - 1;
  const month = months[monthIndex];
  const day = SplittedDate[0];

  return (
    <div className="m-3 flex space-x- w-[1040px] h-[231px] rounded-[8px] px-[24px] py-[16px] bg-[#F2F2F2]">
      <div className="flex flex-col justify-center w-[344px] h-[197px] rounded-[8px] bg-gray">
        <img
          src={eventPicture}
          alt="event"
          className="w-full h-full object-cover rounded-t-[16px]"
        />
      </div>
      <div className="flex flex-col pl-[41px]">
        <div className="h-[150px] w-[600px]">
          <div className="font-semibold text-[24px]">{eventName}</div>
          <div className="pt-[1px] font-medium text-[14px] text-gray">
            {eventSummary}
          </div>
          <div className="pt-[1px] flex font-medium text-[14px] text-gray">
            <div className="flex flex-col justify-center">
              <CiLocationOn />
            </div>
            <div className="pl-[12px]">{location}</div>
          </div>
        </div>
        <div className="flex justify-end pt-[37px]">
          <ButtonFullRoleBased role={role}>Details</ButtonFullRoleBased>
        </div>
      </div>
    </div>
  );
};

export const TrainingCard = ({}) => {
  return (
    <div className="mt-8">
      <div className="text-[30px] font-semibold">Training Progress</div>
      <img src="http://placehold.it/700x300"></img>
    </div>
  );
};
