import React from "react"
import CardRecap from "../../components/CardRecap";
import Wallet from "../../Wallet";
import DB from '../../class/models/actions';
import { async } from "q";

class Overview extends React.Component {
    claimInterest = async () => {
        const tx = await Wallet.ddai.distributeStack();
        const selectedRecipe = await Wallet.ddai.getRecipe()
        DB.claim(selectedRecipe, Wallet.getAddress(), tx.transactionHash);
    }

    render() {
        return(
            <CardRecap onClaimInterest={this.claimInterest} />
        )
    }
}

export default Overview;