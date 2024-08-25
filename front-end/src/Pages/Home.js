import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink,
} from "react-router-dom";


import { ScheduleCard, CarousellCard} from "../Components/Cards.js";
import { ButtonFull } from "../Components/Button.js";
import SideBar from '../Components/SideBar.js';

const Container = styled.div``;
const SideBarWrapper = styled.div``;

export default function HomeView() {
    return (
        <Container className="flex w-full h-screen">
            <SideBarWrapper>
                <Router>
                    <SideBar />
                    <div className="flex flex-col w-full p-4">
                        <Switch>
                            <Route exact path="/" component={HomeView} />
                            <Route path="/about" component={HomeView} />
                            <Route path="/profile" component={HomeView} />
                            <Route path="/training" component={HomeView} />
                            <Route path="/volunteering" component={HomeView} />
                        </Switch>
                    </div>
                </Router>
            </SideBarWrapper>
        </Container>
    );
}