import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-size: var(--text-prettysmall);
  padding: 3% 6%;
  border-radius: 10px;
  background-color: var(--white);
  border: 1px solid #827f7f;
  flex: 0 0 auto;
`;

const Heading = styled.h1`
  font-size: var(--text-big);
  text-align: center;
  margin-bottom: 10px;
  @media (max-width: 800px) {
    font-size: var(--text-big-mobile);
  }
`;

const SubHeading = styled.h2`
  font-size: var(--text-medium);
  font-weight: 300;
  margin-top: -10px;
  text-align: center;
  word-wrap: break-word;

  @media (max-width: 800px) {
    font-size: var(--text-medium-mobile);
    font-weight: 300;
    margin-top: -10px;
  }
`;

const BoldGreen = styled.span`
  font-weight: 700;
  color: #2edfb7;
`;

const ColorfulButton = styled.button`
  width: 100%;
  padding: 4% 10%;
  background-color: #000;
  color: #fff;
  text-align: center;
  font-size: var(--font-main-button);
  font-weight: 700;
  border-radius: 5px;
  margin: 0 0 10px 0;
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.3s;

  :hover {
    opacity: 0.8;
    color: #fff;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }

  :disabled {
    pointer-events: none;
  }
`;

const Image = styled.img`
  margin: auto auto 6%;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const CardAction = props => {
  return (
    <Container style={props.disabled ? { filter: "grayscale(100%)" } : {}}>
      <Heading>{props.heading}</Heading>
      <SubHeading>{props.subheading}</SubHeading>
      <Image src={props.url} />
      <ColorfulButton
        disabled={props.disabled}
        style={
          props.selected || props.disabled ? { backgroundColor: "#cccccc" } : {}
        }
        onClick={() => {
          if (props.disabled) {
            alert("Recipe disabled for this network");
          } else if (props.selected) {
            alert(`It's already selected :)`);
          } else {
            props.onPress();
          }
        }}
      >
        {props.disabled ? "DISABLED" : props.selected ? "Selected" : "Select"}
      </ColorfulButton>
    </Container>
  );
};

export default CardAction;
