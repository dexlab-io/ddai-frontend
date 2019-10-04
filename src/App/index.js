import React, { Component } from 'react';
import {HeaderContainer} from '../components';
import Routes from '../routes';
import './styles.css';


class App extends Component {
    render() {
        return (
                <div>
                    <HeaderContainer />
                    <Routes />
                </div>
        );
    }
}

App.propTypes = {
};

export default App;