import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

const Image = styled.img`
  height: 50px;
`;

const Logo = props => {
  return (
    <LogoContainer>
      <Image src={`../images/earn-logo.svg`} />
    </LogoContainer>
  );
};

export default Logo;
