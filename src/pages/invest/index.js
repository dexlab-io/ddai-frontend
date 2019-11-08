import React from "react";
import CardContainer from "../../containers/CardContainer";
import {InvestMoreDAI} from "../../components";
import { useHistory } from "react-router-dom";
import { cta } from "../../mixpanel";


const Invest = (props) => {
    const history = useHistory();
    return(
        <div>
            <InvestMoreDAI label={"Go to Overview"} onPress={() => {
                cta({
                    position: "invest",
                    to: "/overview",
                    type: "button",
                    label: "Go to Overview"
                  });
                   history.push("/overview")}} 
                   />
            <CardContainer />
        </div>
    )
}
export default Invest;