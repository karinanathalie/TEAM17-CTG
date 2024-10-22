// npm install @material-ui/core @material-ui/icons react-router-dom@5
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { Home, Person, School, EmojiEvents } from "@mui/icons-material";
import HomeView from "./Pages/Home.js";
import SideBar from "./Components/SideBar.js";
import styled from "styled-components";
import { BackButton, VolunteerParticipantToggle } from "./Components/Button.js";
import { ScheduleCard, CarousellCard, EventCard } from "./Components/Cards.js";
import { RegistrationCard } from "./Components/RegistrationCard.js";
import Upcoming from "./Pages/Upcoming.js";
import EventDetails from "./Pages/EventDetails.js";
import IndividualEventDetail from "./Pages/IndividualEventDetail.js";
import { CarousellCards } from "./Components/Cards.js";
import Calendarr from "./Components/Calendar.jsx";
// import { SwipingCard } from "./Components/SwipingCard.js";
import Profile from "./Components/Profile.js";
import Distance from "./Components/Distance.js";
import DistanceCalculator from "./Components/kilo.js";
import Login from "./Pages/Login.js";

const Container = styled.div``;

function App() {
  return (
    <Container className="w-screen h-screen flex overflow-y-scroll">
      <div className="w-[400px]">
        <Router>
          <SideBar>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={HomeView} />
              <Route path="/events" component={Upcoming} />
              <Route path="/myregistration" component={EventDetails} />
              <Route path="/event-detail" component={IndividualEventDetail} />
              {/* <Route path="/login" component={Login} /> */}
            </Switch>
          </SideBar>
        </Router>
      </div>
      {/* <DistanceCalculator></DistanceCalculator> */}
    </Container>
  );
}

export default App;
