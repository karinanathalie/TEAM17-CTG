import { React, useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import LocationComponent from "../Components/Distance.js";

import { ScheduleCard, CarousellCard, EventCard } from "../Components/Cards.js";
import { ButtonAccount, ButtonFull } from "../Components/Button.js";
import SideBar from "../Components/SideBar.js";
import Calendarr from "../Components/Calendar.jsx";
import Achievements from "../Components/Achievements.js";
import { SwipingCard } from "../Components/SwipingCard.js";
import Events from "../Components/Events.js";

const Container = styled.div``;
const Wrapper = styled.div``;

export default function HomeView() {
  const API_KEY = "AIzaSyA-MRj2eDVgcHiGggfhYFGRD_gGdnGqo3A";
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    name: "",
  });
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation({ lat, lon, name: "" });
    fetchLocationName(lat, lon);
  };

  const fetchLocationName = (lat, lon) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const name = data.results[0].formatted_address;
          setLocation((prev) => ({ ...prev, name }));
        } else {
          setError("Location name not found.");
        }
      })
      .catch((err) => setError("Error fetching location name."));
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An error occurred.");
    }
  };
  return (
    <Container className="font-poppins flex w-full h-screen m-[29px]">
      <Wrapper className="flex flex-col mt-4 w-full">
        <Wrapper className="w-full">
          <Wrapper className="text-[32px] font-medium">
            Welcome Back! 👋🏻
          </Wrapper>
          <Wrapper className="mt-4 w-full">
            <Achievements />
            <Wrapper className="flex space-x-4 mt-4 w-full">
              <Calendarr />
              <Wrapper className="space-y-2">
                <Wrapper className="text-[28px] font-medium">Schedule</Wrapper>
                <ScheduleCard
                  date="12-07-2003"
                  location="Hong Kong"
                  eventPicture=""
                  eventName="Hello World"
                  eventSummary="Hello World Lorem Ipsum"
                  role="Participant"
                />
                <ScheduleCard
                  date="12-07-2003"
                  location="Hong Kong"
                  eventPicture=""
                  eventName="Hello World"
                  eventSummary="Hello World Lorem Ipsum"
                  role="Participant"
                />
                <ScheduleCard
                  date="12-07-2003"
                  location="Hong Kong"
                  eventPicture=""
                  eventName="Hello World"
                  eventSummary="Hello World Lorem Ipsum"
                  role="Participant"
                />
              </Wrapper>
              {/* <EventCard date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" eventSummary="Hello World Lorem Ipsum" role="Participant" /> */}
              {/* <Calendarr /> */}
            </Wrapper>
          </Wrapper>
          <Wrapper className="border border-black h-[240px] rounded-[8px] w-[670px]"></Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <ButtonAccount location={location} />
        <SwipingCard />
      </Wrapper>
    </Container>
  );
}
