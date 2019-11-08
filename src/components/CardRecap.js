import React, { useContext } from "react";
import styled from "styled-components";
import { CardInvestmentToken, IF } from "../components";
import CardAPR from "../components/CardAPR";
import CardEarned from "../components/CardEarned";
import CardInvestmentAmount from "./CardInvestmentAmount";
import CardReward from "./CardReward";
import CardTwoButtons from "./CardTwoButtons";
import { Context } from "../context";
import SecondaryButton from "./SecondaryButton";
import InvestMoreDAI from "./InvestMoreDAI";
import { useHistory } from "react-router-dom";
import { cta } from "../mixpanel";


const Center = styled.div`
  margin: 0 auto;
`;
const Container = styled.div`
  margin: 2% 27%;
  display: flex;
  flex-direction: column;
  font-size: var(--text-prettysmall);
  padding: 1% 2%;
  border-radius: 10px;
  border: 1px solid rgb(186, 186, 186);
  background-color: var(--white);
  flex: 0 0 auto;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0 0%;
    padding: 1% 5%;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    font-size: var(--text-prettysmall);
    border-radius: 10px;
    background-color: var(--white);
  }
`;

const CardRecap = (props) => {
  const context = useContext(Context);
  const history = useHistory();
  const DDAI = context.DDAI;

  return (
    <div>
      <Center>
        <InvestMoreDAI label={"Change recipe"} onPress={() => {
           cta({
            position: "overview",
            to: "/recipes",
            type: "button",
            label: "Change recipe"
          });
           history.push("/recipes")
          }}/>
      </Center>
      <Container>
        <IF what={context.DDAI.Balance == undefined}>
              Loading ⏳
        </IF>
        <CardEarned investmentTokenAmount={DDAI.OutStandingInterest + DDAI.TotalInterest} />
        <CardInvestmentAmount investmentTokenAmount={parseFloat(DDAI.TotalBalance).toFixed(2)} />
        <CardAPR currentRate={DDAI.Apr} />
        <CardReward />
        <CardTwoButtons
        firstButtonText="Claim Interest" 
        onFirstPress={ () => {
          cta({
            position: "overview",
            type: "button",
            label: "Claim Interest"
          });
          props.onClaimInterest()
        }} 
        secondButtonText="Withdraw" 
        onSecondPress={ () => {
          cta({
            position: "overview",
            to: "/withdraw",
            type: "button",
            label: "Withdraw"
          });
          history.push("/withdraw")
          }}/>
      </Container>
      <InvestMoreDAI onPress={() => {
        cta({
          position: "overview",
          to: "/invest-more",
          type: "button",
          label: "Invest more DAI"
        });
         history.push("/invest-more");
      }} />
      
    </div>
  );
};

export default CardRecap;
