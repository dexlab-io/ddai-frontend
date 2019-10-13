import React, { Component } from "react";
import { PageHeading } from "../../components";
import CardContainer from "../../containers/CardContainer";
import ActionCardContainer from "../../containers/ActionCardContainer";

class Dapp extends Component {
  state = {
    walletAddress: null,
    web3available: false
  };

  render() {
    return (
      <div>
        <ActionCardContainer />
        <PageHeading />
        <CardContainer />
      </div>
    );
  }
}

export default Dapp;
