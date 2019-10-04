import React from "react";
import styled from "styled-components";
import CardAmount from "./CardAmount";
import CardInvestmentToken from "./CardInvestmentToken";
import CardAPR from "./CardAPR";
import CardOneButton from "./CardOneButton";
import CardSelectRecipe from "./CardSelectRecipe";

const Container = styled.div`
  width: 36%;
  margin: 0 30%;
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

const CardContainer = props => {
  return (
    <Container>
      <CardAmount />
      <CardInvestmentToken />
      <CardAPR />
      <CardSelectRecipe />
      <CardOneButton />
    </Container>
  );
};

export default CardContainer;
