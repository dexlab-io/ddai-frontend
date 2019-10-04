import React from "react";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";

const RowContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 0;
`;

const CardOneButton = props => {
  return (
    <RowContainer>
      <PrimaryButton></PrimaryButton>
    </RowContainer>
  );
};

export default CardOneButton;
