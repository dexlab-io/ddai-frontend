import React ,{ Component } from "react";
import styled from "styled-components";
import CardAmount from "../components/CardAmount";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import CardOneButton from "../components/CardOneButton";
import CardSelectRecipe from "../components/CardSelectRecipe";
import { IF } from "../components";
import Wallet from '../Wallet';
import U from '../class/utils';

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

class CardContainer extends Component {
  state = {
    walletAddress: null,
    web3available: false,
    dDaiBalance: 0,
    APR: 0,
    amount: 0,
    balanceDAI: 0,
    needAllowance: false
  }

  componentDidMount() {
    Wallet.Rx.subscribe((action, data)  => {
      this.refresh();
    });
  }

  async onChangeAmount(e) {
    const amount = e.target.value;
    this.setState({
      amount
    });

    if(amount !== '' && Wallet.ddai) {
      const needAllowance = await Wallet.ddai.needAllowance(amount);
      console.log('needAllowance', needAllowance);
      this.setState({
        needAllowance
      });
    }
    
  }

  async refresh() {
      if(!Wallet.ddai) return;

      const data = await Wallet.ddai.getState();
      console.log(data)

      this.setState({
          dDaiBalanceLabel: U.formatFiat(data.Balance),
          dDaiBalance: data.Balance,
          balanceDAI: data.BalanceDAI,
          APR: data.Apr
      })
  }

  async validate() {
    if(!Wallet.ddai) return;
    console.log('do things...');
    //const supplyTx = await Wallet.ddai.mint(this.state.amount);
    const supplyTx = await Wallet.ddai.mintAndSetRecipes(this.state.amount);
    this.refresh();
  }

  async withdraw() {
    if(!Wallet.ddai) return;
    console.log('do things...');
    const supplyTx = await Wallet.ddai.redeem(this.state.amount);
    this.refresh();
  }

  async claim() {
    if(!Wallet.ddai) return;
    const supplyTx = await Wallet.ddai.claimInterest();
    this.refresh();
  }

  async claim() {
    if(!Wallet.ddai) return;
    const supplyTx = await Wallet.ddai.claimInterest();
    this.refresh();
  }

  render() {
    const { dDaiBalance, amount, needAllowance, balanceDAI, dDaiBalanceLabel } = this.state;
    const btnLabel = needAllowance ? 'ALLOW & INVEST' : 'INVEST';
    return (
      <Container>
        <CardAmount maxValue={balanceDAI} amount={amount} onChange={ (e) => this.onChangeAmount(e)} />
        <CardInvestmentToken investmentTokenAmount={dDaiBalanceLabel} />
        
        <CardAPR currentRate={this.state.APR.toFixed(2)}/>
        <CardSelectRecipe />

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

export default CardContainer;