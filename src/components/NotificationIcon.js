import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
cursor: pointer
  @media (max-width: 800px) {
    position: absolute;
    top:30px;
    right:50px;
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
    <LogoContainer onClick={props.onPress}>
      <Dot>•</Dot>
      <Image src={`../images/notificationIcon.svg`} />
    </LogoContainer>
  );
};

export default NotificationIcon;
