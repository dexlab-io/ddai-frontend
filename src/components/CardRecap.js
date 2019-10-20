import React, { useContext } from "react";
import styled from "styled-components";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import CardEarned from "../components/CardEarned";
import CardInvestmentAmount from "./CardInvestmentAmount";
import CardReward from "./CardReward";
import CardTwoButtons from "./CardTwoButtons";
import { Context } from "../context";
import PrimaryButton from "./PrimaryButton";
import InvestMoreDAI from "./InvestMoreDAI";
import { useHistory } from "react-router-dom";

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

  if(context.DDAI.Balance == undefined) {
    return(
      <span>Loading....</span>
    )
  }

  const DDAI = context.DDAI;

  return (
    <div>
    <Container>
      <CardInvestmentAmount investmentTokenAmount={parseFloat(DDAI.TotalBalance).toFixed(2)} />
      <CardInvestmentToken  />
      <CardAPR currentRate={DDAI.Apr} />
      <CardReward />
      <CardEarned investmentTokenAmount={DDAI.OutStandingInterest + DDAI.TotalInterest} />
      <CardTwoButtons onFirstPress={() => history.push("/invest")} firstButtonText="Deposit" secondButtonText="Withdraw" onSecondPress={() => {history.push("/redeem")}}/>
      <PrimaryButton onPress={props.onClaimInterest}>Claim Interest</PrimaryButton>
    </Container>
    <InvestMoreDAI />
    </div>
  );
};

export default CardRecap;
