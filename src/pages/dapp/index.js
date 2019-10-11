import React, { Component } from 'react';
import { PageHeading, CardOneButton, IF } from "../../components";
import CardReceiveTokenContainer from "../../containers/CardContainer";

class Dapp extends Component {

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

                <IF what={selectedVehicle === 1}>
                    <CardReceiveTokenContainer />    
                </IF>

                <IF what={selectedVehicle === 3}>
                    <CardReceiveTokenContainer />    
                </IF>

                <IF what={!selectedVehicle}>
                    <CardOneButton onPress={ () => this.setState({selectedVehicle: 1})} label={'Supply dai earn Token'} />
                    <CardOneButton onPress={ () => this.setState({selectedVehicle: 3})} label={'Supply dai earn Repay Compound loan'} />
                    <CardOneButton onPress={ () => this.setState({selectedVehicle: 4})} label={'Supply dai earn Repay Fulcrum loan'} />
                </IF>
                
                
            </div>
        );
    }
}

export default Dapp;