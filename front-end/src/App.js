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
import { ButtonFull, ButtonFull2 } from "./Components/Button.js";
import Login from "./Components/login2.jsx";
import Calendarr from "./Components/Calendar.jsx";

function App() {
  return (
    <Container>
      <Calendarr></Calendarr>

      <Router>
        <SideBar>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/about" component={HomeView} />
            <Route path="/profile" component={HomeView} />
            <Route path="/training" component={HomeView} />
            <Route path="/volunteering" component={HomeView} />
          </Switch>
        </SideBar>
      </Router>

      {/* <ScheduleCard date="12-07-2003" eventName="Hello World" eventSummary="hello" /> */}
    </Container>
  );
}

export default App;
