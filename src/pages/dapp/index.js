import React, { Component } from "react";
import { PageHeading } from "../../components";
import CardContainer from "../../containers/CardContainer";
import ActionCardContainer from "../../containers/ActionCardContainer";
import CardRecap from "../../components/CardRecap";

class Dapp extends Component {
  state = {
    walletAddress: null,
    web3available: false
  };

  render() {
    return (
      <div>
      <PageHeading />
        <ActionCardContainer />
        <CardRecap />
        <CardContainer />
      </div>
    );
  }
}

export default Dapp;
