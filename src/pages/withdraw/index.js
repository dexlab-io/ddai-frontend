import React from 'react';
import { InvestMoreDAI } from "../../components";
import CardContainer from "../../containers/CardContainer";
import { useHistory } from "react-router-dom";
import { cta } from "../../mixpanel";



const Redeem = (props) => {
    const history = useHistory();
    return(
        <div>
            <InvestMoreDAI label={"Go to Overview"} onPress={() => {
           cta({
            position: "withdraw",
            to: "/overview",
            type: "button",
            label: "Invest more DAI"
          });
           history.push("/overview")
          }} />
            <CardContainer action="withdraw" 
            onPress={() => {
                cta({
                 position: "withdraw",
                 to: "/withdraw",
                 type: "button",
                 label: "Withdraw"
               });
               }}
               />
        </div>
    )
}

export default Redeem;