import React from "react";
import styled from "styled-components";
import { CardAction, IF, InvestMoreDAI } from "../components";
import { Context } from "../context";
import { withRouter } from "react-router-dom";
import Wallet from '../Wallet';

import CONF from '../config';
const config = CONF[CONF.selectedNetwork];

const Container = styled.div`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: center;
                      width: 92%;
                      padding: 2% 4% 0 4%;
                      overflow-x: scroll;
                      overflow-y: hidden;
                      flex-wrap: wrap;
                      -webkit-overflow-scrolling: touch;
  }
`;

class ActionCardContainer extends React.Component {
  handleRecipeSelected = (key) => async () => {
    const isLoading = this.context.DDAI.Apr == undefined;
    if(isLoading) {
      alert('Please install Metamask first');
      return;
    }

    this.context.setRecipe(key);
    
    if(this.context.DDAI.TotalBalance == 0) {
      this.props.history.push("/deposit");
    } else {
      await Wallet.ddai.setRecipes(key);
      this.props.history.push("/overview");
    }

  }

  goOverview() {
    console.log('overview')
    this.props.history.push("/overview")
    console.log('overview')
  }

  render() {
  
    const isLoading = this.context.DDAI.Apr == undefined;
    console.log('this.context.selectedRecipe', this.context)

    return (
      <React.Fragment>
        <IF what={this.context.DDAI.TotalBalance > 0}>
            <InvestMoreDAI onPress={() => this.goOverview()} label={"Go to Overview"}/>
        </IF>
        <Container>
          {Object.keys(config.recipes).map((key, index) => {
            const recipe = config.recipes[key];
            return (
              <CardAction 
                key={key}
                recipeKey={recipe.key}
                url={recipe.img}
                heading={recipe.title}
                disabled={recipe.disabled}
                subheading={recipe.description.replace("{interestRate}", this.context.DDAI.Apr ? this.context.DDAI.Apr : 10)}
                onPress={this.handleRecipeSelected(key)}
                selected={key == this.context.selectedRecipe ? true : false}
              />
            )
          })}
        </Container>
      </React.Fragment>
    );
  }
}
ActionCardContainer.contextType = Context;

export default withRouter(ActionCardContainer);
