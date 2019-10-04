import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Web3Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  border: solid 1px #000;
  border-radius: 5px;
  transition-property: background-color, color;
  transition-duration: 0.3s;

  :hover {
    background-color: #000;
    color: #fff;
  }

  :focus {
    outline: none;
  }

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin: 2% 5%;
  }
`;

const ConnectedMetamask = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const ConnectW3Button = props => {
  return (
    <Web3Button>
      <ConnectedMetamask onClick={props.onPress}>
        Conect Metamask
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
