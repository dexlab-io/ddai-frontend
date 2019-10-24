import React, { Component } from "react";
import styled from "styled-components";
import CardInvestmentToken from "./CardInvestmentToken";
import CardAPR from "./CardAPR";
import CardEarned from "./CardEarned";
import CardInvestmentAmount from "./CardInvestmentAmount";
import CardReward from "./CardReward";
import CardTwoButtons from "./CardTwoButtons";

const Container = styled.div`
  width: 42%;
  margin: 2% 27%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: var(--text-prettysmall);
  padding: 1% 2%;
  border-radius: 10px;
  background-color: var(--white);
  flex: 0 0 auto;

  @media (max-width: 800px) {
    width: 80%;
    margin: 0 5%;
    padding: 0 5%;
    display: flex;
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
    <a href="#">
    <Container onClick={props.onPress}>
            <Left>Invest More DAI</Left>
      <Right>
        <Image src={`../images/r_dai.png`} />
        <Image src={`../images/little_arrow.png`} />
        <Image src={`../images/eaBoth.png`} />
      </Right>
    </Container>
    </a>
  );
};

export default InvestMoreDAI;
