import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import TotBalance from "./TotBalance";
import Web3Button from "./Web3Button";

const Container = styled.div`
  width: 100%;
  padding: 2% 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  @media (max-width: 800px) {
    width: 90%;
    padding: 2% 5%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HeaderContainer = props => {
  return (
    <Container>
      <Logo />
      <TotBalance />
      <Web3Button />
    </Container>
  );
};

export default HeaderContainer;
