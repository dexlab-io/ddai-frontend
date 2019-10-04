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

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin: 2% 5%;
  }
`;

const ConnectedAddress = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 10px;
`;

const ConnectW3Button = props => {
  return (
    <Web3Button>
      <ConnectedAddress onClick={props.onPress}>
        Conect Metamask
      </ConnectedAddress>
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
