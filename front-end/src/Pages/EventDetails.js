import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useHistory } from "react-router-dom";
import { BackButton, VolunteerParticipantToggle } from "../Components/Button";
import { EventCard } from "../Components/Cards";

const Container = styled.div``;
const ContentWrapper = styled.div``;
const EventListWrapper = styled.div``;

export default function EventDetails() {
  const [current_role, setRole] = useState("Participant");

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const [list_of_events, set_list_of_events] = useState([
    {
      event_name: "Event 1",
      event_date: "2023-12-12",
      event_location: "Hong Kong",
      event_picture: "http://placehold.it/1050x300",
      event_summary: "Event 1 Summary",
      event_role: "Participant",
    },
    {
      event_name: "Event 2",
      event_date: "2023-12-12",
      event_location: "Hong Kong",
      event_picture: "http://placehold.it/1050x300",
      event_summary: "Event 2 Summary",
      event_role: "Volunteer",
    },
  ]);

  const handleRoleToggle = () => {
    setRole((prevRole) =>
      prevRole === "Participant" ? "Volunteer" : "Participant"
    );
  };
  useEffect(() => {
    // fetching the event details from the backend
    let backend_base = "http://localhost:8000/";
    fetch(backend_base + "api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status == 200) {
        // if the fetch is successful update the eventDetails json object
        set_list_of_events(
          await res.json().then((data) => data.map((event) => event.fields))
        );
      } else {
        // if the fetch is unsuccessful, display an error message
        alert("Internal Server Error");
      }
    });
  }, []);

  return (
    <Container className="flex w-full h-screen overflow-y-scroll">
      <ContentWrapper className="w-full flex flex-col px-[53px]">
        <ContentWrapper className="w-full flex justify-between mt-[58px] mb-8">
          <BackButton onClick={goBack} />
          <VolunteerParticipantToggle onClick={handleRoleToggle} />
        </ContentWrapper>
        <EventListWrapper className="w-full flex flex-col">
          {list_of_events.map((event) => {
            return (
              <EventCard
                date={event.event_date}
                location={event.event_location}
                eventPicture={event.event_image}
                eventName={event.event_name}
                eventDescription={event.event_description}
                eventSummary={event.event_summary}
                role={current_role}
              />
            );
          })}
        </EventListWrapper>
      </ContentWrapper>
    </Container>
  );
}
