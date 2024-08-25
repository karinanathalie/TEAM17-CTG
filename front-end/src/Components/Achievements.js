import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
// import { ButtonLove } from "./Button";
// import Tag from "./Tag";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div``;

const Achievements = ({ streak, location, distance, price, tags, onClick }) => {
  return (
    <Container className="flex h-[230px] font-poppins bg-lightblue rounded-[16px] w-[660px]">
        <Wrapper className="w-full font-[24px] m-8 mr-4 flex">
            <Wrapper className="text-[16px] font-bold w-1/2">
                    Streak 🔥
                    {/* { streak } */}
                    <Wrapper className="font-medium h-fit flex-row">
                        <Wrapper className="text-[60px] h-fit">
                            10 <span className="text-[32px] h-fit"> x</span> 
                            {/* { streak } */} 
                        </Wrapper>
                        <Wrapper className="text-[12px] leading-tight">
                            in the last <b> 2 months </b>
                        </Wrapper>
                        <Wrapper className="flex items-center gap-2 mt-3">
                        <div className="flex space-x-2">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className="w-8 h-8 bg-pink rounded-full flex items-center justify-center text-white font-bold">
                                    <AiOutlineCheckCircle className="w-8 h-8 "/>
                                </span>
                            ))}
                        </div>
                        </Wrapper>
                    </Wrapper>
            </Wrapper>
        </Wrapper>
        <Wrapper className="m-8 w-full">
            Your Badges
            <Wrapper className="flex space-x-2">

                <Wrapper className="mt-2 flex space-x-2">
                    {Array.from({ length: 4 }, (_, i) => (
                                <span key={i} className="w-16 h-16 bg-blue rounded-full flex items-center justify-center text-white font-bold">B</span>
                    ))}
                </Wrapper>
            </Wrapper>
        </Wrapper>
    </Container>
  );
};

export default Achievements;
