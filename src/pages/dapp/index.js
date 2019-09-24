import React, { Component } from 'react';
import { Button, ActivityTimeline, TimelineMarker } from 'react-rainbow-components';
import { EthereumHDWallet } from 'eth-dexcore-js';
import { IF } from "../../components";

class Dapp extends Component {

    state = {
        walletAddress: null,
        web3available: false
    }

    async init() {
        this.W = new EthereumHDWallet();
        await this.W.setWeb3();

        this.setState({
            walletAddress: this.W.getAddress(),
            web3available: true
        })
    }

    render() {
        const { web3available, walletAddress } = this.state;
        return (
            <div className="rainbow-p-vertical_large rainbow-align-content_center rainbow-flex_wrap">

                <IF what={!web3available}>
                    <Button onClick={ () => this.init()} label="Connect metamask" />
                </IF>
                
                <IF what={web3available}>
                    <div className="rainbow-m-around_xx-large">
                        <ActivityTimeline>
                            <TimelineMarker
                                label="Metamask connected."
                                datetime="now"
                                description="Metamask available."
                            />
                            <TimelineMarker
                                label="User authentified with address."
                                datetime="Today"
                                description={walletAddress}
                            />
                        </ActivityTimeline>
                    </div>
                </IF>
                
            </div>
        );
    }
}

export default Dapp;