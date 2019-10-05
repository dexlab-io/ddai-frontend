import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
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
      <PrimaryButton onPress={props.onPress}></PrimaryButton>
    </RowContainer>
  );
};

CardOneButton.propTypes = {
  onPress: PropTypes.func
};

CardOneButton.defaultProps = {
  onPress: () => alert('Clicked')
};

export default CardOneButton;
