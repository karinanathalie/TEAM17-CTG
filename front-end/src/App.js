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

const Container = styled.div``;

function App() {
  return (
    <Container>
      {/* <Router>
      <SideBar>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/about" component={HomeView} />
          <Route path="/profile" component={HomeView} />
          <Route path="/training" component={HomeView} />
          <Route path="/volunteering" component={HomeView} />
        </Switch>
      </SideBar>
    </Router>  */}
      {/* <VolunteerParticipantToggle /> */}
      {/* <RegistrationCard /> */}
      {/* <Upcoming> </Upcoming> */}
<<<<<<< Updated upstream
      \
      <CarousellCards />
      {/* <EventDetails /> */}
=======
      {/* <EventCard date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" eventSummary="Hello World Lorem Ipsum" role="Participant" /> */}
      
      {/* <EventDetails /> */}
      <HomeView />
      
>>>>>>> Stashed changes
    </Container>
  );
}

export default App;
