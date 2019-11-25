import React from "react";
import styled from "styled-components";

const RowContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 0;
  @media (max-width: 800px) {
    margin-top:20px;
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

const CardEarned = props => {
  return (
    <RowContainer>
      <Left>Earned so far</Left>
      <Right>{props.investmentTokenAmount} dDAI</Right>
    </RowContainer>
  );
};

CardEarned.defaultProps = {
  investmentTokenAmount: 0
}

export default CardEarned;
