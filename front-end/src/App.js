// npm install @material-ui/core @material-ui/icons react-router-dom@5

import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Home, Person, School, EmojiEvents } from '@mui/icons-material';
import HomeView from './Pages/Home.js';
import SideBar from './Components/SideBar.js';
import styled from 'styled-components';
import { ButtonFull } from './Components/Button.js';

const Container = styled.div``


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
    </Router> */}
        
        <ButtonFull>Click me</ButtonFull>
        
    </Container>
  );
}

export default App;