import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 292px;
  margin: 2%;
  display: flex;
  flex-direction: column;
  font-size: var(--text-prettysmall);
  padding: 1% 2%;
  border-radius: 10px;
  background-color: var(--white);
  flex: 0 0 auto;

  @media (max-width: 800px) {
    width: 80%;
    margin: 0 5%;
    padding: 1% 5%;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    font-size: var(--text-prettysmall);
    border-radius: 10px;
    background-color: var(--white);
  }
`;

const Heading = styled.h1`
  font-size: var(--text-big);
  text-align: center;

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
  background-color: #f8e71c;
  color: #000;
  text-align: center;
  font-size: var(--font-main-button);
  font-weight: 700;
  border-radius: 5px;
  margin: 0% 0;
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.3s;

  :hover {
    background-color: #000;
    color: #f8e71c;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 2% 0;
  }
`;

const Image = styled.img`
  width: 292px;
  text-align: center;
  margin-bottom: 6%;
`;

const CardAction = props => {
  console.log('props', props)
  return (
    <Container style={props.disabled ? { filter: "grayscale(100%)" } : {}}>
      <Heading>{props.heading}</Heading>
      <SubHeading>{props.subheading}</SubHeading>
      <Image src={props.url} />
      <ColorfulButton onClick={() => {
        if(props.disabled) {
          alert("Recipe disabled for this network");
        } else if(props.selected) {
          alert(`It's already selected :)`);
        } else {
          props.onPress()
        }
        }}>
        {props.disabled ? "DISABLED" : (props.selected ? "Selected" : "Select")}
      </ColorfulButton>
    </Container>
  );
};

export default CardAction;
