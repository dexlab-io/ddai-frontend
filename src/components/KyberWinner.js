import React from "react";
import styled from "styled-components";

const Winner = styled.a`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 9999;
  margin-top: 2px;
  width: 200px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const KyberWinner = props => {
  return (
    <Winner href="https://blog.kyber.network/kyberdefi-hackathon-meet-the-winners-bea5bc9ec983" target="_blank" rel="noreferrer">
    <img src="../../images/winner.png" width="200px"></img>
    </Winner>
  );
};

export default KyberWinner;
