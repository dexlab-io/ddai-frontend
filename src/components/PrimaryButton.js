import React from "react";
import styled from "styled-components";

const ButtonMain = styled.a`
  width: 80%;
  padding: 4% 10%;
  background-color: #f8e71c;
  color: #000;
  text-align: center;
  font-size: var(--font-main-button);
  font-weight: 700;
  border-radius: 5px;
  margin: 2% 0;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 2% 5%;
  }
`;

const PrimaryButton = props => {
  return <ButtonMain>INVEST</ButtonMain>;
};

export default PrimaryButton;
