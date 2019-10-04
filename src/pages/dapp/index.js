import React, { Component } from 'react';
import { PageHeading, CardContainer } from "../../components";

class Dapp extends Component {

    state = {
        walletAddress: null,
        web3available: false
    }

    render() {
        return (
            <div>
                <PageHeading />
                <CardContainer />    
            </div>
        );
    }
}

export default Dapp;