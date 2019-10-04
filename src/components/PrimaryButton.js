import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const ButtonMain = styled.button`
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
  return <ButtonMain onClick={props.onPress}>INVEST</ButtonMain>;
};

PrimaryButton.propTypes = {
  onPress: PropTypes.func
};

PrimaryButton.defaultProps = {
  onPress: () => alert('Clicked')
};

export default PrimaryButton;
