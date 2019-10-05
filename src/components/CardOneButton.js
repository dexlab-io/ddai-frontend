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
      <PrimaryButton label={props.label} onPress={props.onPress}></PrimaryButton>
    </RowContainer>
  );
};

CardOneButton.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string
};

CardOneButton.defaultProps = {
  onPress: () => alert('Clicked'),
  label: 'INVEST',
  isDisabled: false,
};

export default CardOneButton;
