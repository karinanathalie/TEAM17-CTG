import React from "react";
// import { ButtonLove } from "./Button";
// import Tag from "./Tag";
import styled from "styled-components";

const Container = styled.div``;
const ButtonLoveContainer = styled.div``;
const Wrapper = styled.div``;

const CardInfo = ({ name, location, distance, price, tags, onClick }) => {
  return (
    <Container className="w-full font-poppins ss:rounded-[24px] fs:rounded-[16px] ss:p-6 fs:p-4  flex place-content-between shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white">
      <Container>
        <Wrapper className="grid grid-cols-4 ss:gap-4 fs:gap-1">
          <Wrapper className="col-span-3">
            <p className="ss:text-base fs:text-sm font-semibold mb-2 h-auto overflow-hidden text-ellipsis whitespace-nowrap">
              {" "}
              {name}{" "}
            </p>
            <Wrapper className="flex mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M7.75098 5.33093C7.75098 6.15936 7.0794 6.83093 6.25098 6.83093C5.42255 6.83093 4.75098 6.15936 4.75098 5.33093C4.75098 4.50251 5.42255 3.83093 6.25098 3.83093C7.0794 3.83093 7.75098 4.50251 7.75098 5.33093Z"
                  stroke="#9C9EA0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.001 5.33093C10.001 8.902 6.25098 10.9559 6.25098 10.9559C6.25098 10.9559 2.50098 8.902 2.50098 5.33093C2.50098 3.25986 4.17991 1.58093 6.25098 1.58093C8.32204 1.58093 10.001 3.25986 10.001 5.33093Z"
                  stroke="#9C9EA0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs font-medium text-grey h-auto overflow-hidden text-ellipsis whitespace-nowrap">
                {" "}
                {location} | {distance} km away{" "}
              </p>
            </Wrapper>
            <Wrapper className="flex mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="-2 2 13 8"
                fill="none"
              >
                <path
                  d="M5 2V8M3.5 6.5909L3.93944 6.9205C4.5252 7.35984 5.47491 7.35984 6.06068 6.9205C6.64644 6.48116 6.64644 5.76884 6.06068 5.3295C5.76777 5.10981 5.38385 4.99998 4.99994 5C4.63748 5.00002 4.2751 4.8902 3.99855 4.67051C3.4455 4.23117 3.4455 3.51886 3.99855 3.07952C4.5516 2.64018 5.44827 2.64018 6.00131 3.07952L6.20876 3.24431M9.5 5C9.5 7.48528 7.48528 9.5 5 9.5C2.51472 9.5 0.5 7.48528 0.5 5C0.5 2.51472 2.51472 0.5 5 0.5C7.48528 0.5 9.5 2.51472 9.5 5Z"
                  stroke="#9C9EA0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs font-medium text-grey ml-0.5"> {price} </p>
            </Wrapper>
          </Wrapper>
          <Wrapper>
            {/* <ButtonLoveContainer>
              <ButtonLove onClick={onClick} />
            </ButtonLoveContainer> */}
          </Wrapper>
        </Wrapper>
        {/* <Tag tags={tags} /> */}
      </Container>
    </Container>
  );
};

export default CardInfo;
