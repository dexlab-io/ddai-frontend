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

const Center = styled.div`
  margin: 0 auto;
`;
const Container = styled.div`
  width: 42%;
  margin: 2% 27%;
  display: flex;
  flex-direction: column;
  font-size: var(--text-prettysmall);
  padding: 1% 2%;
  border-radius: 10px;
  background-color: var(--white);
  flex: 0 0 auto;

  @media (max-width: 800px) {
    width: 80%;
    margin: 0 5%;
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
        <InvestMoreDAI label={"Change recipe"} onPress={() => history.push("/recipes")} />
      </Center>
      <Container>
        <IF what={context.DDAI.Balance == undefined}>
              Loading ⏳
        </IF>
        <CardEarned investmentTokenAmount={DDAI.OutStandingInterest + DDAI.TotalInterest} />
        <CardInvestmentAmount investmentTokenAmount={parseFloat(DDAI.TotalBalance).toFixed(2)} />
        <CardAPR currentRate={DDAI.Apr} />
        <CardReward />
        <CardTwoButtons onFirstPress={props.onClaimInterest} firstButtonText="Claim Interest" secondButtonText="Withdraw" onSecondPress={() => {history.push("/withdraw")}}/>
      </Container>
      <InvestMoreDAI onPress={() => history.push("/invest-more")} />
      
    </div>
  );
};

export default CardRecap;
