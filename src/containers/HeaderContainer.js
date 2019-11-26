import React, { Component } from "react";
import styled from "styled-components";
import { TotBalance, Web3Button, Logo, IF } from "../components/";
import ConnectW3Button from "../components/ConnectW3Button";
import NotificationIcon from "../components/NotificationIcon";
import U from "../class/utils";
import Wallet from "../Wallet";
import { withRouter } from "react-router-dom";
import NotificationsDrawer from "../components/NotificationsDrawer";
import { Context } from "../context";

const Container = styled.div`
  width: 90%;
  margin: 0 5%;
  padding: 2% 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;

  @media (max-width: 800px) {
    width: 100%;
    padding: 2%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Mobilerow = styled.div`
  display: flex;
  width: 95%;
  margin: 0 5%
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 0;
  }
`;


class HeaderContainer extends Component {
  state = {
    walletAddress: null,
    web3available: false,
    amount: false
  };

  componentDidMount() {
    // Hacky coockie for auto login
    if (window.localStorage.login) {
      this.init();
    }
  }

  async init(buttonPressed) {
    // Checking if metamask is installed on browser and an address is active
    if (
      typeof window.ethereum === "undefined" ||
      typeof window.web3 === "undefined"
    ) {
      window.open("https://metamask.io", "_blank");
    } else {
      await Wallet.setWeb3();

      const connected = Wallet.getAddress() ? true : false;
      if(!connected) {
        window.alert(
          "No address is selected in Metamask, add an address to get started!"
        );
        return;
      }
      

      Wallet.Rx.notify("Connected", connected);

      this.setState({
        walletAddress: Wallet.getAddress(),
        web3available: connected
      });

      window.localStorage.login = true;
    }
  }

  render() {
    const { walletAddress, web3available } = this.state;
    const balance = this.context.DDAI.Balance || 0;
    const { pathname } = this.props.location;
    return pathname !== "/" ? (
      <Container>
        <Logo />
        <Mobilerow>
          <TotBalance
            amount={
              web3available && balance
                ? "$" + U.formatFiat(Number.parseFloat(balance).toFixed(2))
                : web3available
                ? "$0"
                : "no wallet connected"
            }
          />

          <IF what={Wallet.getAddress()}>
            <Web3Button address={walletAddress} />
          </IF>

          <IF what={!Wallet.getAddress()}>
            <ConnectW3Button
              onPress={() => this.init(true)}
              label="Connect metamask"
            />
          </IF>
        </Mobilerow>
        {/* <SimpleSnackbar /> */}
        <NotificationIcon onPress={this.context.toggleNotificationsDrawer} />
        <NotificationsDrawer />
      </Container>
    ) : null;
  }
}

HeaderContainer.contextType = Context;

export default withRouter(HeaderContainer);
