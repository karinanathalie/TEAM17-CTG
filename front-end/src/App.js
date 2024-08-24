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

const Container = styled.div``;

function App() {
  return (
    <Container>
      <Calendarr></Calendarr>
    </Container>
  );
}

export default App;
