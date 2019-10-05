import React, { Component } from "react";
import styled from "styled-components";
import { TotBalance, Web3Button, Logo, IF } from "../components/";
import ConnectW3Button from "../components/ConnectW3Button"
import U from '../class/utils';
import Wallet from '../Wallet';


const Container = styled.div`
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
    web3available: false,
    amount: false
  }

  async init() {
      console.log('adf')
      await Wallet.setWeb3();
      
      const connected = Wallet.getAddress() ? true : false;
      Wallet.Rx.notify('Connected', connected)

      const data = await Wallet.ddai.getState();
      
      this.setState({
          walletAddress: Wallet.getAddress(),
          web3available: connected,
          totalAmount: U.formatFiat(data.Balance),
      })
  }

  render() {
    const { walletAddress, totalAmount, web3available } = this.state;
    return (
      <Container>
        <Logo />
        <TotBalance amount={web3available ? '$'+totalAmount: 'no wallet connected'}/>

        <IF what={Wallet.getAddress()}>
          <Web3Button address={walletAddress} />
        </IF>
        
        <IF what={!Wallet.getAddress()}>
          <ConnectW3Button onPress={ () => this.init()} label="Connect metamask" />
        </IF>
        
      </Container>
    );
  }
}

export default HeaderContainer;
