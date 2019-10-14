
import React from "react";
import { Context } from "../../context";
import {
  Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

class Dapp extends React.Component {

    render() {
        if(this.context.DDAI.Balance == undefined) {
          return <span>Loading......</span>
        }

        if(this.context.DDAI.Balance == 0) {
          return (<Redirect to="/recipes" />);
        } else {
          return (<Redirect to="/overview" />);
        }
    }
}

Dapp.contextType = Context

export default Dapp;
