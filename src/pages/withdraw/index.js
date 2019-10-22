import React from 'react';
import { PageHeading, CardOneButton, IF } from "../../components";
import CardContainer from "../../containers/CardContainer";

class Withdraw extends React.Component {
    render() {
        return(
            <>
                <CardContainer action="withdraw" />
            </>
        )
    }

}

export default Withdraw;