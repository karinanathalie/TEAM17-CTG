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
import Calendarr from '../Components/Calendar.jsx';

const Container = styled.div``;
const Wrapper = styled.div``;

export default function HomeView() {
    return (
        <Container className="font-poppins flex w-full h-screen m-8">
            <Wrapper className='flex flex-col mt-4 w-full'>
                <div>
                    <div className="text-[32px] font-medium">
                        Welcome Back! 👋🏻
                    </div>
                    <div className="">
                        <Calendarr />
                    </div>
                </div>
                 
            </Wrapper> 
            <Wrapper>

            </Wrapper>
        </Container>
    );
}