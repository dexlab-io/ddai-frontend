import React from "react";
import styled from "styled-components";

const RowContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 0;
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
