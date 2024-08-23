// npm install @material-ui/core @material-ui/icons react-router-dom@5

import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Home, Person, School, EmojiEvents } from '@mui/icons-material';
import HomeView from './components/Home.js';
import SideBar from './components/SideBar.js';
import styled from 'styled-components';
const Testing = styled.div``

function App() {
  return (
    <Testing>
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
    </Testing>
  );
}

export default App;