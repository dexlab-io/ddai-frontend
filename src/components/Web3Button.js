import React from "react";
import styled from "styled-components";

const Web3ButtonConnected = styled.span`
  display: flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  border: solid 1px #000;
  border-radius: 5px;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 2% 5%;
  }
`;

const ConnectedAddress = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 10px;
`;

const ConnectedMainnet = styled.span`
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: var(--text-small);
  font-weight: 500;
`;

const Web3Button = props => {
  return (
    <Web3ButtonConnected>
      <ConnectedAddress>0x84775645638f6...746Y</ConnectedAddress>
      <ConnectedMainnet>❇️ Mainnet</ConnectedMainnet>
    </Web3ButtonConnected>
  );
};

export default Web3Button;
