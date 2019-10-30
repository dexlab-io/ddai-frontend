import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LogoContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  height: 80px;

  @media (max-width: 800px) {
    width: 100px;
  }
`;

const Logo = props => {
  const history = useHistory();

  return (
    <LogoContainer>
      <Image onClick={() => (history.push("/"))} src={`../images/logo.svg`} />
    </LogoContainer>
  );
};

export default Logo;
