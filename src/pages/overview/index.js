import React from "react"
import CardRecap from "../../components/CardRecap";

class Overview extends React.Component {

    claimInterest = () => {

    }

    render() {
        return(
            <CardRecap onClaimInterest={this.claimInterest} />
        )
    }
}

export default Overview;