// npm install @material-ui/core @material-ui/icons react-router-dom@5

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
// import { Home, Person, School, EmojiEvents } from "@mui/icons-material";
import HomeView from "./Pages/Home.js";
import SideBar from "./Components/SideBar.js";
import styled from "styled-components";

import Login from "./Components/login.jsx";
import Calendarr from "./Components/Calendar.jsx";
import { Container } from "@mui/material";

function App() {
  return <Container>test</Container>;
}

export default App;
