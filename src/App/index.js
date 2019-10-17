import React, { Component } from "react";
import { HeaderContainer } from "../components";
import Routes from "../routes";
import { Context, ContextDefaults } from "../context";
import Wallet from '../Wallet';
import "./styles.css";
import history from '../history';
import { Router } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      context: {
        ...ContextDefaults,
        setRecipe: this.setRecipe,
        selectedRecipe: "",
      }
    }
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

    this.setState((prevState) => ({
      context: {
        ...prevState.context,
        DDAI: data
      }
    }))
  }

  setRecipe = (recipe) => {
    this.setState((prevState) => ({
      context:{
        ...prevState.context,
        selectedRecipe: recipe
      }
    }))
  }

  render() {
    // this.state.context.setRecipe("LOL");
    console.log(this.state.context);

    return (
      <Context.Provider value={this.state.context}>
        <div>
          <Router history={history}>
            <HeaderContainer />
            <Routes />
          </Router>
        </div>
      </Context.Provider>
    );
  }
}
App.propTypes = {};

export default App;
