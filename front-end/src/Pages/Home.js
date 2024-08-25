import React from 'react';
import styled from 'styled-components';


import { ScheduleCard} from "../Components/Cards.js";
import { ButtonAccount } from "../Components/Button.js";
import Calendarr from '../Components/Calendar.jsx';
import Achievements from '../Components/Achievements.js';
import { SwipingCard } from '../Components/SwipingCard.js';

const Container = styled.div``;
const Wrapper = styled.div``;

export default function HomeView() {
    return (
        <Container className="font-poppins flex w-full h-screen m-[29px]">
            <Wrapper className='flex flex-col mt-4 w-full'>
                <Wrapper className="w-full">
                    <Wrapper className="text-[32px] font-medium">
                        Welcome Back! 👋🏻
                    </Wrapper>
                    <Wrapper className="mt-4 w-full">
                        <Achievements />
                        <Wrapper className="flex space-x-4 mt-4 w-full">
                            <Calendarr />
                            <Wrapper className="space-y-2">
                                <Wrapper className="text-[28px] font-medium">
                                    Schedule
                                </Wrapper>
                                <ScheduleCard date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" eventSummary="Hello World Lorem Ipsum" role="Participant" />
                                <ScheduleCard date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" eventSummary="Hello World Lorem Ipsum" role="Participant" />
                                <ScheduleCard date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" eventSummary="Hello World Lorem Ipsum" role="Participant" />
                            </Wrapper>
                             {/* <EventCard date="12-07-2003" location="Hong Kong" eventPicture="" eventName="Hello World" eventSummary="Hello World Lorem Ipsum" role="Participant" /> */}
                            {/* <Calendarr /> */}
                        </Wrapper>
                    </Wrapper>
                    <Wrapper className="border border-black h-[240px] rounded-[8px] w-[670px]">
                    </Wrapper>
                </Wrapper>
            </Wrapper> 
            <Wrapper>
                <ButtonAccount />
                <SwipingCard />
            </Wrapper>
        </Container>
    );
}