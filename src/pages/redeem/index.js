import React from 'react';
import { PageHeading, CardOneButton, IF } from "../../components";
import CardContainer from "../../containers/CardContainer";

class Redeem extends React.Component {
    render() {
        return(
            <>
                <CardContainer action="withdraw" />
            </>
        )
    }

}

export default Redeem;