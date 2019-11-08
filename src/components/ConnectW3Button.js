import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { cta } from "../mixpanel";


const Web3Button = styled.button`
  width: 100%;
  display: inline-block;
  padding: 4% 10%;
  border-radius: 4px;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  text-align: center;
  background: #F00093;
  border: solid 1px #fff;
  color: #fff; 

  :hover {
    background-color: #000;
    color: #fff;
  }

  :focus {
    outline: none;
  }

  @media (max-width: 800px) {
    display: flex;
    text-align: center;
    margin: 2% 0;
  }
`;

const ConnectedMetamask = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  width: 100%;
`;

const ConnectW3Button = props => {
  return (
    <Web3Button onClick={() => {
      cta({
        position: "navbar",
        to: "Metamask",
        type: "button",
        label: "Connect Metamask"
      });
    props.onPress()
    }}>
      <ConnectedMetamask >
          Connect Metamask
      </ConnectedMetamask>
    </Web3Button>
  );
};

ConnectW3Button.propTypes = {
  onPress: PropTypes.func
};

ConnectW3Button.defaultProps = {
  onPress: () => alert("Clicked")
};

export default ConnectW3Button;
