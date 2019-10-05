import React ,{ Component } from "react";
import styled from "styled-components";
import CardAmount from "../components/CardAmount";
import CardInvestmentToken from "../components/CardInvestmentToken";
import CardAPR from "../components/CardAPR";
import CardOneButton from "../components/CardOneButton";
import CardSelectRecipe from "../components/CardSelectRecipe";
import Wallet from '../Wallet';



const Container = styled.div`
  width: 36%;
  margin: 0 30%;
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
    needAllowance: false
  }

  componentDidMount() {
    Wallet.Rx
      .subscribe((action, data)  => {
        this.refresh();
      })
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
      

      this.setState({
          dDaiBalance: data.Balance
      })
  }

  async validate() {
    console.log('do things...');
    const supplyTx = await Wallet.ddai.mint(this.state.amount);
    this.refresh();
  }

  render() {
    const { dDaiBalance, needAllowance } = this.state;
    const btnLabel = needAllowance ? 'ALLOW & INVEST' : 'INVEST';

    return (
      <Container>
        <CardAmount onChange={ (e) => this.onChangeAmount(e)} />
        <CardInvestmentToken investmentTokenAmount={dDaiBalance} />
        <CardAPR />
        <CardSelectRecipe />
        <CardOneButton onPress={ () => this.validate()} label={btnLabel} />
      </Container>
    );
  }
};

export default CardContainer;
