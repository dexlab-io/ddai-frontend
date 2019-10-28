import React from "react";
import CardContainer from "../../containers/CardContainer";
import {InvestMoreDAI} from "../../components";
import { useHistory } from "react-router-dom";

const Invest = (props) => {
    const history = useHistory();
    return(
        <div>
            <InvestMoreDAI label={"Go to Overview"} onPress={() => history.push("/overview")} />
            <CardContainer />
        </div>
    )
}
export default Invest;