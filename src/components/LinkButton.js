import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import PrimaryButton from "./PrimaryButton";

const RowContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
`;

const Link = styled.span`
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
  transition-property: background-color, color;
  transition-duration: 0.3s;

  :label {
    color: #000;
  }

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


const LinkButton = props => {
  return (
    <RowContainer>
      <Link label={props.label} onPress={props.onPress}></Link>
    </RowContainer>
  );
};

LinkButton.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string
};

LinkButton.defaultProps = {
  onPress: () => alert('Clicked'),
  label: 'INVEST',
  isDisabled: false,
};

export default LinkButton;
