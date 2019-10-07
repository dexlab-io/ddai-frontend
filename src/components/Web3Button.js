import React from "react";
import styled from "styled-components";

const Web3ButtonConnected = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  border: solid 1px #000;
  border-radius: 5px;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 90%;
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
    max-width: 17rem;
  }

  @media (max-width:640px) {
    max-width: 15rem;
  }

  @media (max-width:460px) {
    max-width: 12rem;
  }
`;

// const ConnectedMainnet = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: left;
//   font-size: var(--text-small);
//   font-weight: 500;

//   @media (max-width: 700px) {
//     display: none;
//   }

//   @media (max-width: 640px) {
//     display: block;
//   }
// `;

const Web3Button = props => {
  return (
    <Web3ButtonConnected>
      <ConnectedAddress>{props.address} ❇️ Mainnet</ConnectedAddress>
      {/* <ConnectedMainnet>❇️ Mainnet</ConnectedMainnet> */}
    </Web3ButtonConnected>
  );
};

Web3Button.propTypes = {
  address: ""
};

export default Web3Button;
