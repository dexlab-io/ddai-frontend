import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ButtonMain = styled.button`
  width: 100%;
  padding: 4% 10%;
  background-color: #f8e71c;
  color: #000;
  text-align: center;
  font-size: var(--font-main-button);
  font-weight: 700;
  border-radius: 5px;
  margin: 2% 0;
  border: none;

  :hover {
    opacity: 0.8;
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

const PrimaryButton = props => {
  return <ButtonMain onClick={props.onPress}>INVEST</ButtonMain>;
};

PrimaryButton.propTypes = {
  onPress: PropTypes.func
};

PrimaryButton.defaultProps = {
  onPress: () => alert("Clicked")
};

export default PrimaryButton;
