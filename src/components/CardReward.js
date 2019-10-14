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
  margin: 0% 0;
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  margin-left: 2%;

  :hover {
    opacity: 0.8;
    color: #fff;
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
  return (
    <RowContainer>
      <Left>Earning Reward</Left>
      <Right>
        <ButtonSmall>Change</ButtonSmall>
        <Image src={`../images/eaBoth.png`} />
      </Right>
    </RowContainer>
  );
};

export default CardReward;
