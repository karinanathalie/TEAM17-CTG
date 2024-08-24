import React from "react";
import { styled } from "styled-components";
import SideBar from "../Components/SideBar";


const Container = styled.div``;


export default function EventDetails(){

    return(
        <Container className="flex">
            <SideBar />
        </Container>
    )
}