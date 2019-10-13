import React from "react";
import styled from "styled-components";
import CardAction from "../components/CardAction";

import Wallet from '../Wallet';

import '../Wallet'
import CONF from '../config';
const config = CONF[CONF.selectedNetwork];

const Container = styled.div`
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: space-between;
                      width: 92%;
                      padding: 2% 4% 0 4%;
                      overflow-x: scroll;
                      overflow-y: hidden;
                      -webkit-overflow-scrolling: touch;
  }
`;

class ActionCardContainer extends React.Component {
  state = {
    APR: 0
  }

  componentDidMount() {
    Wallet.Rx.subscribe((action, data)  => {
      this.refresh();
    });

    setInterval(() => {
      this.refresh()
    }, 2000);
  }

  async refresh() {
    if(!Wallet.ddai) return;

    const data = await Wallet.ddai.getState();

    this.setState({
      APR: data.Apr,
    })
  }

  render() {
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
              subheading={recipe.description.replace("{interestRate}", this.state.APR)}
              onPress={this.props.clickHandler(key)}
              selected={key == this.props.selectedRecipe ? true : false}
            />
          )
        })}
      </Container>
    );
  }
}

export default ActionCardContainer;
