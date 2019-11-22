import React from "react";
import styled from "styled-components";

const Web3ButtonConnected = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  background: #F00093;
  border: solid 1px #fff;
  color: #fff; 
  border-radius: 5px;
  

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 2% 0;
  }
`;

const ConnectedAddress = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 32rem;

  @media (max-width: 980px) {
  }
`;

const Web3Button = props => {
  return (
    <Web3ButtonConnected>
      <ConnectedAddress>{`${props.address.substring(0, 16)}...${props.address[props.address.length-1]}`} ❇️ Kovan</ConnectedAddress>
    </Web3ButtonConnected>
  );
};

Web3Button.propTypes = {
  address: ""
};

export default Web3Button;
