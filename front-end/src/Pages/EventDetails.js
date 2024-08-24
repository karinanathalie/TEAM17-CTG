import React from "react";
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
            <ContentWrapper className="w-full flex flex-col px-[53px]">
                <ContentWrapper className="w-full flex justify-between mt-[58px] mb-8">
                    <BackButton />
                    <VolunteerParticipantToggle />
                </ContentWrapper>
                <EventListWrapper className="w-full flex flex-col">
                    {list_of_events.map((event) => {
                        return(
                            <EventCard date={event.event_date} location={event.event_location} eventPicture={event.event_picture} eventName={event.event_name} eventSummary={event.event_summary} role={event.event_role}/>
                        )
                    })}
                </EventListWrapper>
            </ContentWrapper>
        </Container>
    )
}