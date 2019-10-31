import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Context } from "../context";
import CONF from '../config';
const config = CONF[CONF.selectedNetwork];

const RowContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 0;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const Left = styled.span`
  display: flex;
  flex-grow: 1;
  text-align: left;
  font-weight: 700;
  align-items: center;
`;

const Right = styled.span`
  display: flex;
  flex-grow: 3;
  flex-direction: row-reverse;
  padding: 1.5% 0;
  align-items: center;
  @media (max-width: 800px) {
    flex-grow: 0;
    padding: 1.5% 0;
  }
`;

const Image = styled.img`
  height: 35px;
`;

const ButtonSmall = styled.button`
  padding: 2% 5%;
  background-color: #000;
  color: #fff;
  text-align: center;
  font-size: var(--font-small);
  font-weight: 700;
  border-radius: 2px;
  margin: 0;
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  margin-left: 2%;
  cursor: pointer;


  :hover {
    opacity: 0.8;
    color: #fff;
    cursor:pointer;
    
  }

  :focus {
    outline: none;
  }

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 2% 0;
  }
`;

const CardReward = props => {
  const context = useContext(Context);

  return (
    <RowContainer>
      <Left>Earning Reward in {context.DDAI.Recipe}</Left>
      <Right>
        <ButtonSmall><Link style={{color: "inherit"}} to="/recipes">Change</Link></ButtonSmall>
        <Image src={context.DDAI.Recipe ? config.recipes[context.DDAI.Recipe].imgRecap : ""} />
      </Right>
    </RowContainer>
  );
};


export default CardReward;
