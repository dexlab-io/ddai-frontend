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
  width: 100%;
  padding: 1rem 0rem;
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

const Mobilerow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    if(window.localStorage.login) {
      this.init();
    }
  }

  async init() {
    await Wallet.setWeb3();

    const connected = Wallet.getAddress() ? true : false;
    Wallet.Rx.notify("Connected", connected);

    this.setState({
      walletAddress: Wallet.getAddress(),
      web3available: connected,
    });

    window.localStorage.login = true;
  }

  render() {
    const { walletAddress, web3available } = this.state;
    const balance = this.context.DDAI.Balance|| 0;
    const {pathname} = this.props.location;
    return (
       pathname !== '/' ?
         <Container>
            <Logo />
            <Mobilerow>
              <TotBalance
                amount={
                  web3available && balance
                    ? "$" + U.formatFiat(balance)
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
                onPress={() => this.init()}
                label="Connect metamask"
              />
            </IF>
            </Mobilerow>
            {/* <SimpleSnackbar /> */}
            <NotificationIcon onPress={this.context.toggleNotificationsDrawer} />
            <NotificationsDrawer />
          </Container>
      : null
    );
  }
}

HeaderContainer.contextType = Context;

export default withRouter(HeaderContainer);
