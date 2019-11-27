import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Context } from "../context";
import CONF from '../config';
import { cta } from "../mixpanel";

const config = CONF[CONF.selectedNetwork];


const RowContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 0;
  @media (max-width: 800px) {
  }
`;
const Left = styled.span`
  display: flex;
  text-align: left;
  font-weight: 700;
  align-items: center;
  max-width: 40%;
`;

const Right = styled.span`
  display: flex;
  flex-direction: row-reverse;
  padding: 1.5% 0;
  align-items: center;
  font-size: 18px;
  max-width: 50%;
  @media (max-width: 800px) {
    padding: 0;
    font-size: 19px;
    padding: 0;
  }
`;

const Image = styled.img`
  height: 35px;
`;

const ButtonSmall = styled.button`
  padding: 3% 7%;
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
    justify-content: center;
    margin: 2% 0 2% 2%;
  }
`;

const CardReward = props => {
  const context = useContext(Context);
  console.log(context);

  return (
    <RowContainer>
      <Left>Earning Reward in {context.selectedRecipe}</Left>
      <Right>
        <ButtonSmall><Link onClick={() => {
           cta({
            position: "overview",
            to: "/recipes",
            type: "button",
            label: "Change recipe"
          });
          } }
          style={{color: "inherit"}} to="/recipes">Change</Link></ButtonSmall>
        <Image src={context.selectedRecipe ? config.recipes[context.DDAI.Recipe].imgRecap : ""} />
      </Right>
    </RowContainer>
  );
};


export default CardReward;
