import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
// import { ButtonLove } from "./Button";
// import Tag from "./Tag";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div``;

const Achievements = ({ streak, location, distance, price, tags, onClick }) => {
  return (
    <Container className="flex w-[655px] h-[180px] font-poppins bg-lightblue rounded-[16px]">
        <Wrapper className="flex flex-col w-full font-[24px] mx-[31px] my-[19px] ">
            <Wrapper className="text-[12px] font-bold w-1/2">
                Streak 🔥
            </Wrapper>
            <Wrapper className="mt-[-10px] font-medium h-fit flex-row">
                <Wrapper className="text-[60px]">
                    10 <span className="text-[30px]"> x</span> 
                </Wrapper>
            </Wrapper>
            <Wrapper className="mt-[-10px] text-[14px] leading-tight">
                    in the last <b> 2 months </b>
            </Wrapper>
            <Wrapper className="flex items-center gap-2 mt-3">
                <div className="flex space-x-2">
                    {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className="mt-[-5px] w-8 h-8 bg-pink rounded-full flex items-center justify-center text-white font-bold">
                            <AiOutlineCheckCircle className="w-8 h-8 "/>
                        </span>
                    ))}
                </div>
            </Wrapper>
        </Wrapper>
        <Wrapper className="w-full px-[19px] my-[19px] mx-[0px] border-l-2 border-blue text-[16px]">
            Your Badges
            <Wrapper className="flex space-x-2">
                <Wrapper className="mt-2 flex flex-wrap justify-center gap-2">
                    {Array.from({ length: 8 }, (_, i) => (
                                <span key={i} className="w-[50px] h-[50px] bg-blue rounded-full flex items-center justify-center text-white font-bold">B</span>
                    ))}
                </Wrapper>
            </Wrapper>
        </Wrapper>
    </Container>
  );
};

export default Achievements;
