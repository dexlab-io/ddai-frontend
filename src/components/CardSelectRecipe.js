import React from "react";
import styled from "styled-components";

const RowContainer = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const Form = styled.form`
  background-color: #f2f2f2;
  border: none;
  padding: 6% 3%;
  width: 100px;

  @media (max-width: 800px) {
    background-color: rgb(255, 255, 255);
    border: none;
    padding: 6% 0;
    max-width: 100px;
  }
`;

const Select = styled.select`
  border: 0px solid #f2f2f2;
  border-radius: 5px;
  background-color: #f2f2f2;
  text-align: right;
  width: 100px;

  :focus {
    outline: none;
  }
`;

const Option = styled.option`
  background-repeat: no-repeat;
  background-position: cover;
  padding-left: 0px;
`;

const CardSelectRecipe = props => {
  return (
    <RowContainer>
      <Left>Earning Reward</Left>
      <Right>
        <Form>
          <Select name="token" id="currencies" className="icon-menu">
            <Option value="ETH">ETH</Option>
            <Option value="WBTC">WBTC</Option>
          </Select>
        </Form>
      </Right>
    </RowContainer>
  );
};

export default CardSelectRecipe;
