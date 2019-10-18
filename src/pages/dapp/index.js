import React, { Component } from "react";
import { PageHeading, CardOneButton, IF } from "../../components";
import CardReceiveTokenContainer from "../../containers/CardContainer";
import ActionCardContainer from "../../containers/ActionCardContainer";
import CardRecap from "../../components/CardRecap";
import NotificationCard from "../../components/NotificationCard";
import SimpleSnackbar from "../../components/SimpleSnackbar";

class Dapp extends Component {
  state = {
    walletAddress: null,
    web3available: false
  };

  state = {
    walletAddress: null,
    web3available: false,
    selectedVehicle: null
  };

  render() {
    const { selectedVehicle } = this.state;
    return (
      <div>
        <NotificationCard />
        <PageHeading />
        <CardRecap />
      </div>
    );
  }
}

export default Dapp;
