import React ,{ Component } from "react";
import styled from "styled-components";

import { compareAddresses } from 'eth-dexcore-js';
import find from 'lodash/find';
import CardAmount from "../components/CardAmount";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import CardOneButton from "../components/CardOneButton";
import CardSelectRecipe from "../components/CardSelectRecipe";
import { IF } from "../components";
import Wallet from '../Wallet';
import U from '../class/utils';
import CONF from '../config';

const config = CONF[CONF.selectedNetwork];

const Container = styled.div`
  width: 42%;
  margin: 0 27%;
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

class CardReceiveTokenContainer extends Component {
  state = {
    walletAddress: null,
    web3available: false,
    dDaiBalance: 0,
    APR: 0,
    amount: 0,
    balanceDAI: 0,
    needAllowance: false,
    selectedOutputToken: config.allowedOutputTokens[0].outputToken,
    activeRecipes: []
  }

  componentDidMount() {
    Wallet.Rx.subscribe((action, data)  => {
      this.refresh();
    });

    setInterval(() => {
      this.refresh()
    }, 2000);
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

  async refresh() {
      if(!Wallet.ddai) return;

      const data = await Wallet.ddai.getState();

      this.setState({
          dDaiBalanceLabel: U.formatFiat(data.Balance),
          dDaiBalance: data.Balance,
          balanceDAI: data.BalanceDAI,
          APR: data.Apr,
          activeRecipes: data.Recipes,
          needAllowance: data.needAllowance
      })
  }

  async validate() {
    if(!Wallet.ddai) return;
    this.submit();
  }

  async submit() {
    const supplyTx = await Wallet.ddai.mintAndSetRecipes(this.state.amount, this.state.selectedOutputToken);
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

  handleChangeToken(token) {
    this.setState({selectedOutputToken: token})
  }

  renderRecipe(r) {
    const tokenSymbol = find(config.allowedOutputTokens, (o) => compareAddresses(o.outputToken, (r.outputToken)) );
    return(
        <div key={r.benificiary+r.outputToken}>One Recipe is active buying {tokenSymbol.label} for {r.benificiary}</div>
    );
  }

  render() {
    const { dDaiBalance, activeRecipes, amount, needAllowance, balanceDAI, dDaiBalanceLabel } = this.state;
    const btnLabel = needAllowance ? 'ALLOW & INVEST' : 'INVEST';
    return (
      <Container>

        <IF what={activeRecipes.length > 0}>
            {activeRecipes.map(this.renderRecipe)}
        </IF>
        
        <CardAmount maxValue={balanceDAI} amount={amount} onChange={ (e) => this.onChangeAmount(e)} />
        <CardInvestmentToken investmentTokenAmount={dDaiBalanceLabel} />
        
        <CardAPR currentRate={this.state.APR}/>
        
        <CardSelectRecipe onChange={this.handleChangeToken.bind(this)} />

        <CardOneButton onPress={ () => this.validate()} label={btnLabel} />

        <IF what={dDaiBalance > 0}>
          <CardOneButton onPress={ () => this.withdraw()} label={'Withdraw'} />
        </IF>

        <IF what={dDaiBalance > 0}>
          <CardOneButton onPress={ () => this.claim()} label={'Claim Interest'} />
        </IF>
        
      </Container>
    );
  }
};

export default CardReceiveTokenContainer;
