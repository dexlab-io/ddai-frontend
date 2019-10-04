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
  font-weight: 700;
  color: #3bc5a6;
`;

const Rates = {
  currentRate: "15.2%"
};

const CardAPR = props => {
  return (
    <RowContainer>
      <Left>APR</Left>
      <Right>{Rates.currentRate}</Right>
    </RowContainer>
  );
};

export default CardAPR;
