import React from "react";
import styled from "styled-components";
import CardAction from "../components/CardAction";
import { Context } from "../context";
import { withRouter } from "react-router-dom";
import Wallet from '../Wallet';

import CONF from '../config';
const config = CONF[CONF.selectedNetwork];

const Container = styled.div`
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                      width: 92%;
                      padding: 2% 4% 0 4%;
                      overflow-x: scroll;
                      overflow-y: hidden;
                      -webkit-overflow-scrolling: touch;
  }
`;

class ActionCardContainer extends React.Component {
  handleRecipeSelected = (key) => async () => {
    this.context.setRecipe(key);
    
    if(this.context.DDAI.TotalBalance == 0) {
      this.props.history.push("/invest");
    } else {
      await Wallet.ddai.setRecipes(key);
      this.props.history.push("/overview");
    }

  }

  render() {

    if(this.context.DDAI.Apr == undefined) {
      return "Loading....";
    }

    return (
      <Container>
        {Object.keys(config.recipes).map((key, index) => {
          const recipe = config.recipes[key];
          return (
            <CardAction 
              key={key}
              recipeKey={recipe.key}
              url={recipe.img}
              heading={recipe.title}
              subheading={recipe.description.replace("{interestRate}", this.context.DDAI.Apr)}
              onPress={this.handleRecipeSelected(key)}
              selected={key == this.context.selectedRecipe ? true : false}
            />
          )
        })}
      </Container>
    );
  }
}
ActionCardContainer.contextType = Context;

export default withRouter(ActionCardContainer);
