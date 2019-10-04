import React, { Component } from "react";
import styled from "styled-components";
import { TotBalance, Web3Button, Logo, IF } from "../components/";
import { Button } from 'react-rainbow-components';

import Wallet from '../Wallet';


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

class HeaderContainer extends Component {
  state = {
    walletAddress: null,
    web3available: false
  }

  async init() {
      await Wallet.setWeb3();

      this.setState({
          walletAddress: Wallet.getAddress(),
          web3available: true
      })
  }

  render() {
    return (
      <Container>
        <Logo />
        <TotBalance />

        <IF what={Wallet.getAddress()}>
          <Web3Button />
        </IF>
        
        <IF what={!Wallet.getAddress()}>
          <Button onClick={ () => this.init()} label="Connect metamask" />
        </IF>
        
      </Container>
    );
  }
}

export default HeaderContainer;
