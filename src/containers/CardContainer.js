import React ,{ Component } from "react";
import styled from "styled-components";

import { compareAddresses } from 'eth-dexcore-js';
import find from 'lodash/find';
import CardAmount from "../components/CardAmount";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import CardOneButton from "../components/CardOneButton";
import CardSelectRecipe from "../components/CardSelectRecipe";
import CardSelectedRecipe from "../components/CardSelectedRecipe";
import { IF } from "../components";
import Wallet from '../Wallet';
import U from '../class/utils';
import CONF from '../config';
import { Context } from "../context";

const config = CONF[CONF.selectedNetwork];

const Container = styled.div`
  width: 42%;
  margin: 0 27%;
  display: flex;
  margin-top: 5%;
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

class CardReceiveTokenContainer extends Component {
  state = {
    walletAddress: null,
    web3available: false,
    dDaiBalance: 0,
    APR: 0,
    amount: 0,
    balanceDAI: 0,
    needAllowance: false,
    recipe: config.recipes[Object.keys(config.recipes)[0]],
    activeRecipes: []
  }

  async onChangeAmount(e) {
    const amount = e.target.value;
    this.setState({
      amount
    });

    if(amount !== '' && Wallet.ddai) {
      const needAllowance = await Wallet.ddai.needAllowance(amount);
      this.setState({
        needAllowance
      });
    }
    
  }

  async validate() {
    if(!Wallet.ddai) return;
    this.submit();
  }

  async submit() {
    const supplyTx = await Wallet.ddai.mintAndSetRecipes(this.state.amount, this.props.selectedRecipe);
  }

  async withdraw() {
    if(!Wallet.ddai) return;
    console.log('do things...');
    const supplyTx = await Wallet.ddai.redeem(this.state.amount);
  }

  async claim() {
    if(!Wallet.ddai) return;
    const supplyTx = await Wallet.ddai.distributeStack();
  }

  handleChangeRecipe(recipe) {
    this.setState({recipe: recipe})
  }

  renderRecipe(r) {
    // console.log("r", config.allowedOutputTokens);
    // const tokenSymbol = find(config.allowedOutputTokens, (o) => compareAddresses(o.outputToken, r.outputToken) );
    // return(
    //     <div key={r.benificiary+r.outputToken}>One Recipe is active buying {tokenSymbol.label} for {r.benificiary}</div>
    // );
  }

  render() {
    const { amount } = this.state;
    
    if(!this.context.DDAI.TotalBalance) {
      return(<Container>Loading....</Container>)
    }
    
    const DDAI = this.context.DDAI;
    const btnLabel = DDAI.NeedAllowance ? 'ALLOW & INVEST' : 'INVEST';
    
    return (
      <Container>

        {/* <IF what={activeRecipes.length > 0}>
            {activeRecipes.map(this.renderRecipe)}
        </IF> */}
        
        <CardAmount maxValue={DDAI.BalanceDAI} amount={amount} onChange={ (e) => this.onChangeAmount(e)} />
        <CardInvestmentToken investmentTokenAmount={DDAI.Balance} />
        
        <CardAPR currentRate={DDAI.Apr}/>
        
        <CardSelectedRecipe selectedRecipe={this.props.selectedRecipe} />

        {/* <CardSelectRecipe onChange={this.handleChangeRecipe.bind(this)} /> */}

        <CardOneButton onPress={ () => this.validate()} label={btnLabel} />

        {/* <IF what={dDaiBalance > 0}>
          <CardOneButton onPress={ () => this.withdraw()} label={'Withdraw'} />
        </IF>

        <IF what={dDaiBalance > 0}>
          <CardOneButton onPress={ () => this.claim()} label={'Claim Interest'} />
        </IF> */}
        
      </Container>
    );
  }
};

CardReceiveTokenContainer.contextType = Context;

export default CardReceiveTokenContainer;
