import React ,{ Component } from "react";
import styled from "styled-components";
import CardAmount from "../components/CardAmount";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import { CardOneButton, } from "../components";
import CardSelectedRecipe from "../components/CardSelectedRecipe";
import Wallet from '../Wallet';
import CONF from '../config';
import { Context } from "../context";
import PropTypes  from "prop-types";
import history from "../history";
import DB from '../class/models/actions';

const config = CONF[CONF.selectedNetwork];

const Container = styled.div`
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
    width: 100%;
    margin: 0 0;
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
    activeRecipes: [],
    useDai: false
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

  onChangeSource = (e) => {
    this.setState((prevState) => ({
      useDai: !prevState.useDai
    }));
  }

  async validate() {
    if(!Wallet.ddai) return;

    switch (this.props.action) {
      case "deposit":
          await this.deposit();
        break;
      case "withdraw":
          await this.withdraw();
        break;
      case "invest":
          await this.invest();
        break;
      default:
        break;
    }

    history.push("/overview");
  }

  async deposit() {
    if(this.context.DDAI.Balance == 0) {
      const tx = await Wallet.ddai.mintAndSetRecipes(this.state.amount, this.context.selectedRecipe);
      DB.mint(this.state.amount, 'DAI', Wallet.getAddress(), this.state.amount, tx.transactionHash, tx.status ? 'approved' : 'rejected');
    } else {
      const tx = await Wallet.ddai.mint(this.state.amount);
      DB.mint(this.state.amount, 'DAI', Wallet.getAddress(), this.state.amount, tx.transactionHash, tx.status ? 'approved' : 'rejected');
    }
    
  }

  async withdraw() {
    if(!Wallet.ddai) return;
    console.log('do things...');
    const tx = await Wallet.ddai.redeem(this.state.amount);
    DB.burn(this.state.amount, 'DAI', Wallet.getAddress(), this.state.amount, tx.transactionHash, tx.status ? 'approved' : 'rejected');
  }

  async invest() {
    if(!Wallet.ddai) return;
    const tx = await Wallet.ddai.mintAndDistribute(this.state.amount);
    DB.mint(this.state.amount, 'DAI', Wallet.getAddress(), this.state.amount, tx.transactionHash, tx.status ? 'approved' : 'rejected');
    
  }

  async claim() {
    if(!Wallet.ddai) return;
    const supplyTx = await Wallet.ddai.distributeStack();
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
    const { action } = this.props;
    
    if(!this.context.DDAI.TotalBalance) {
      return(<Container>Loading....</Container>)
    }
    
    const DDAI = this.context.DDAI;
    let btnLabel;
    let maxValue;
    
    switch (action) {
      case "deposit":
          btnLabel = DDAI.NeedAllowance ? 'Allow & Deposit' : 'Deposit';
          maxValue = DDAI.BalanceDAI;
        break;
      case "withdraw":
          btnLabel = "Withdraw"
          maxValue = DDAI.Balance
        break;
      case "invest":
          btnLabel = "Invest"
          maxValue = DDAI.BalanceDAI
        break;
      default:
    }


    return (
      <Container>
        <CardAmount maxValue={maxValue} amount={amount} onChange={ (e) => this.onChangeAmount(e)} />
        <CardInvestmentToken investmentTokenAmount={DDAI.Balance} />
        <CardAPR currentRate={DDAI.Apr}/>
        <CardSelectedRecipe selectedRecipe={this.context.selectedRecipe || this.context.DDAI.Recipe} />
        <CardOneButton onPress={ () => this.validate()} label={btnLabel} />
      </Container>
    );
  }
};

CardReceiveTokenContainer.contextType = Context;

CardReceiveTokenContainer.propTypes = {
  action: PropTypes.string
}

CardReceiveTokenContainer.defaultProps = {
  action: "deposit"
}

export default CardReceiveTokenContainer;
