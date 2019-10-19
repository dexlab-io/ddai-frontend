
import React, { Component } from "react";
import { PageHeading, CardOneButton, IF } from "../../components";
import CardContainer from "../../containers/CardContainer";
import ActionCardContainer from "../../containers/ActionCardContainer";
import CardRecap from "../../components/CardRecap";



class Dapp extends Component {
  state = {
    walletAddress: null,
    web3available: false
  };

    state = {
        walletAddress: null,
        web3available: false,
        selectedVehicle: null,
        selectedRecipe: "ETH"
    }

    handleSetRecipe = (recipe) => () => {
      this.setState({
        selectedRecipe: recipe
      });
    }

    render() {
        // const {selectedVehicle} = this.state;
        return (
            <div>
                {/* I (Mick) think that having a blob of text at the top of the page takes too much prime real estate. Feel free to uncomment below line */}
                {/* <PageHeading /> */}
                <ActionCardContainer selectedRecipe={this.state.selectedRecipe} clickHandler={this.handleSetRecipe} />
                {/* <CardRecap /> */}
                <CardContainer selectedRecipe={this.state.selectedRecipe} />
            </div>
          );
    }
}

export default Dapp;
