import React from 'react';
import { InvestMoreDAI } from "../../components";
import CardContainer from "../../containers/CardContainer";
import { useHistory } from "react-router-dom";


const Redeem = (props) => {
    const history = useHistory();
    return(
        <div>
            <InvestMoreDAI label={"Go to Overview"} onPress={() => history.push("/overview")} />
            <CardContainer action="withdraw" />
        </div>
    )
}

export default Redeem;