import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 42%;
  margin: 1% 27%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
    align-items: flex-start;
    font-size: var(--text-prettysmall);
    border-radius: 10px;
    background-color: var(--white);
  }
`;

const Left = styled.span`
  display: flex;
  align-items: flex-start;
  padding: 2% 5px;
  padding: 1.5% 0;
`;

const Right = styled.span`
  display: flex;
  flex-grow: 3;
  flex-direction: row;
  align-items: flex-start;
  padding: 2% 4%;
  text-align: left;
  font-weight: 700;
`;

const Image = styled.img`
  height: 23px;
  padding: 0 0;
`;

const A = styled.a`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 2% 0 2% 0;
  text-align: right;
  font-weight: 700;
  text-decoration: underline!important;
`;

const NotificationCard = props => {
  return (
    <span>
    <Container>
      <Left>
        <Image src={`../images/pending.svg`} />
      </Left>
      <Right>Your withdrawl of 100 DAI is pending</Right>
      <A href="#">Etherscan</A>
    </Container>

    <Container>
      <Left>
        <Image src={`../images/rejected.svg`} />
      </Left>
      <Right>Your withdrawl of 100 DAI was rejected</Right>
      <A href="#">Etherscan</A>
    </Container>

    <Container>
      <Left>
        <Image src={`../images/approved.svg`} />
      </Left>
      <Right>Your withdrawl of 100 DAI was approved</Right>
      <A href="#">Etherscan</A>
    </Container>
    </span>
  );
};

export default NotificationCard;
