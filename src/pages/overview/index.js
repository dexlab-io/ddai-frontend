import React from "react"
import CardRecap from "../../components/CardRecap";
import Wallet from "../../Wallet";

class Overview extends React.Component {

    claimInterest = async () => {
        await Wallet.ddai.distributeStack();
    }

    render() {
        return(
            <CardRecap onClaimInterest={this.claimInterest} />
        )
    }
}

export default Overview;