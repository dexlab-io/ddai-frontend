import React, { Component } from "react";
import styled from "styled-components";
import { cta } from "../mixpanel";


const Container = styled.button`
  width: 86%;
  margin: 2% 7%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: var(--text-prettysmall);
  padding: 1% 2%;
  border: 1px solid #827f7f;
  border-radius: 10px;
  background-color: var(--white);
  flex: 0 0 auto;
  cursor:pointer;


  @media (max-width: 800px) {
    width: 96%;
    margin: 0 2%;
    padding: 0 0;
    display: flex;
    padding: 10px 10px;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    font-size: var(--text-prettysmall);
    border-radius: 10px;
    background-color: var(--white);
  }
`;

const Left = styled.span`
  display: flex;
  text-align: left;
  font-weight: 700;
  align-items: center;
  padding: 2% 5px;
`;

const Right = styled.span`
  display: flex;
  flex-direction: row;
  padding: 1.5% 0;
  align-items: center;
  padding: 2% 5px;
`;

const Image = styled.img`
  height: 20px;
  padding: 0 5px;
`;

const InvestMoreDAI = props => {
  return (
      <Container onClick={props.onPress}>
        <Left>{props.label}</Left>
        <Right>
          <Image src={`../images/r_dai.png`} />
          <Image src={`../images/little_arrow.png`} />
          <Image src={`../images/eaBoth.png`} />
        </Right>
      </Container>
  );
};

InvestMoreDAI.defaultProps = {
  label: "Invest More DAI",
  onPress: () => {
    cta({
      position: "conversation",
      to: "/invest",
      type: "button",
      label: "Invest More DAI"
    });
  }
}


export default InvestMoreDAI;
