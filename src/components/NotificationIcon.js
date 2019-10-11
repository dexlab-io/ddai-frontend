import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`

@media (max-width: 800px) {
    margin: 2% 0 0 0;
  }

`;

const Dot = styled.div`
position: relative;
    top: 8px;
    left: 4px;
    color: #F8E71C;
    font-size: 48px;
    line-height: 0px;
`;

const Image = styled.img`
  height: 30px;
`;

const A = styled.a`
`;

const NotificationIcon = props => {
  return (
    
    <LogoContainer>
    <A href="">
    <Dot>•</Dot>
      <Image src={`../images/notificationIcon.svg`} />
      </A>
    </LogoContainer>
  );
};

export default NotificationIcon;
