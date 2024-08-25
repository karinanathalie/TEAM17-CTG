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
const Wrapper = styled.div``;

export default function HomeView() {
    return (
        <Container className="flex w-full h-screen">
            <Wrapper className='flex flex-col '>
                
            </Wrapper> 
            <Wrapper>

            </Wrapper>
        </Container>
    );
}