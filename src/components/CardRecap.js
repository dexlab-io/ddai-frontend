import React, { Component } from "react";
import styled from "styled-components";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import CardEarned from "../components/CardEarned";
import CardInvestmentAmount from "./CardInvestmentAmount";
import CardReward from "./CardReward";
import CardTwoButtons from "./CardTwoButtons";

const Container = styled.div`
  width: 42%;
  margin: 2% 27%;
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

const CardRecap = props => {
  return (
    <Container>
    <CardInvestmentAmount />
      <CardInvestmentToken  />
      <CardAPR />
      <CardReward />
      <CardEarned />
      <CardTwoButtons />
    </Container>
  );
};

export default CardRecap;
