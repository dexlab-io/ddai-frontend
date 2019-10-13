import React, { Component } from 'react';
import { PageHeading, CardOneButton, IF } from "../../components";
import CardReceiveTokenContainerTest from "../../containers/CardContainerTest";

class Test extends Component {

    state = {
        walletAddress: null,
        web3available: false,
        selectedVehicle: null,
    }

    render() {
        const {selectedVehicle} = this.state;
        return (
            <div>
                <PageHeading />
                <CardReceiveTokenContainerTest />
            </div>
        );
    }
}

export default Test;