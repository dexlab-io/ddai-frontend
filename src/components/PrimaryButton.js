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
  border-radius: 5px;
  margin: 0% 0;
  border: none;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  font-weight: 700;

  :hover {
    background-color: #000;
    color: #f8e71c;
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
  return <ButtonMain onClick={props.onPress}>{props.children}</ButtonMain>;
};

PrimaryButton.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string
};

PrimaryButton.defaultProps = {
  onPress: () => alert("Clicked"),
  label: 'INVEST'
};

export default PrimaryButton;
