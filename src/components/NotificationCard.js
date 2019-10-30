import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CONF from '../config';

const Container = styled.div`
  width: 95%;
  margin: 1% 1%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: var(--text-prettysmall);
  padding: 1% 2%;
  border-radius: 10px;
  background-color: var(--white);
  flex: 0 0 auto;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0 0%;
    padding: 0 5%;
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: flex-start;
    font-size: var(--text-prettysmall);
    border-radius: 10px;
    background-color: var(--white);
  }
`;

const Left = styled.span`
  display: flex;
  align-items: flex-start;
  padding: 2% 5px;
  padding: 1.5% 0;
`;

const Right = styled.span`
  display: flex;
  flex-grow: 3;
  flex-direction: row;
  align-items: flex-start;
  padding: 2% 4%;
  text-align: left;
  font-weight: 700;
`;

const Image = styled.img`
  height: 23px;
  padding: 0 0;
`;

const A = styled.a`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 2% 0 2% 0;
  text-align: right;
  font-weight: 700;
  text-decoration: underline!important;
`;

const statusImages = {
  "pending": "../images/pending.svg",
  "rejected": "../images/rejected.svg",
  "approved": "../images/approved.svg"
}

const methods = {
  "0x40c10f19": {
    "name": "deposit",
  },
  "0x1e9a6950": {
    "name": "withdraw",
  },
  "0x21edf266": {
    "name": "claim interest"
  },
  "unknown": {
    "name": "unknown method",
  }
}

const NotificationCard = props => {
  let status;
  const { tx } = props;

  if(tx.status === true) {
    status = "approved"
  } else if(tx.status === false) {
    status = "rejected"
  } else {
    status = "pending"
  }
  
  let method;
  if(!tx.input || methods[tx.input.substring(0, 10)] == undefined){
    method = methods["unknown"];
  } else {
    method = methods[tx.input.substring(0, 10)];  
  }
  console.log(method);
  
  let explorerURL;
  if(CONF.selectedNetwork == "mainnet") {
    explorerURL = `https://etherscan.io/tx/${tx.hash}`;
  } else {
    explorerURL = `https://${CONF.selectedNetwork}.etherscan.io/tx/${tx.hash}`;
  }

  return (
    <span>
      <Container>
        <Left>
          <Image src={statusImages[status]} />
        </Left>
        <Right>Your {method.name} is {status}</Right>
        <A target="_blank" href={explorerURL}>Etherscan</A>
      </Container>
    </span>
  );
};

NotificationCard.propTypes = {
  status: PropTypes.oneOf(["approved", "rejected", "pending"]).isRequired
}

export default NotificationCard;