import React, { Component } from "react";
import { HeaderContainer } from "../components";
import Routes from "../routes";
import { Context, ContextDefaults } from "../context";
import Wallet from '../Wallet';
import "./global.scss";
import "./styles.css";
import history from '../history';
import { Router } from "react-router-dom";

import DB from '../class/models/actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      context: {
        ...ContextDefaults,
        setRecipe: this.setRecipe,
        toggleNotificationsDrawer: this.toggleNotificationsDrawer,
        closeNotificationsDrawer: this.closeNotificationsDrawer,
        selectedRecipe: "",
        logs: []
      }
    }
  }

  componentDidMount() {
    Wallet.Rx.subscribe( async (action, data)  => {
      DB.account = Wallet.getAddress();
      await DB.fetchAll();
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
        DDAI: data,
        transactions: Wallet.Rx.poolMap,
        logs: DB.data,
        selectedRecipe: data.Recipe
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

  closeNotificationsDrawer = () => {
    this.setState((prevState => ({
      context:{
        ...prevState.context,
        notificationDrawerOpen: false
      }
    })))
  }

  toggleNotificationsDrawer = () => {
    this.setState((prevState => ({
      context:{
        ...prevState.context,
        notificationDrawerOpen: !prevState.context.notificationDrawerOpen
      }
    })))
  }

  render() {
    return (
      <Context.Provider value={this.state.context}>
        <div>
          <Router history={history}>
            <div className="container">
            <HeaderContainer />
            <Routes />
            </div>
          </Router>
        </div>
      </Context.Provider>
    );
  }
}
App.propTypes = {};

export default App;
