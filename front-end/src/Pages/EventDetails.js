import React, { useState } from "react";
import { styled } from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

import SideBar from "../Components/SideBar";
import { BackButton, VolunteerParticipantToggle } from '../Components/Button';
import { EventCard } from "../Components/Cards";
import HomeView from './Home';

const Container = styled.div``;
const SideBarWrapper = styled.div``;
const ContentWrapper = styled.div``;
const EventListWrapper = styled.div``;


export default function EventDetails(){
    const [current_role, setRole] = useState('Participant');

    const handleRoleToggle = () => {
        setRole(prevRole => prevRole === 'Participant' ? 'Volunteer' : 'Participant');
    };

    const list_of_events = [
        {
            "event_name": "Event 1",
            "event_date": "2023-12-12",
            "event_location": "Hong Kong",
            "event_picture": "http://placehold.it/1050x300",
            "event_summary": "Event 1 Summary",
            "event_role": "Participant"
        },
        {
            "event_name": "Event 2",
            "event_date": "2023-12-12",
            "event_location": "Hong Kong",
            "event_picture": "http://placehold.it/1050x300",
            "event_summary": "Event 2 Summary",
            "event_role": "Volunteer"
        }
    ]

    return(
        <Container className="flex w-full h-screen">
            <ContentWrapper className="w-full flex flex-col px-[53px]">
                <ContentWrapper className="w-full flex justify-between mt-[58px] mb-8">
                    <BackButton />
                    <VolunteerParticipantToggle onClick={handleRoleToggle}/>
                </ContentWrapper>
                <EventListWrapper className="w-full flex flex-col">
                    {list_of_events.map((event) => {
                        return(
                            <EventCard date={event.event_date} location={event.event_location} eventPicture={event.event_picture} eventName={event.event_name} eventSummary={event.event_summary} role={current_role}/>
                        )
                    })}
                </EventListWrapper>
            </ContentWrapper>
        </Container>
    )
}