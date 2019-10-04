import React from "react";
import styled from "styled-components";

const PageHeadingContainer = styled.span`
  width: 100%;
  padding: 2% 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 800px) {
    width: 90%;
    padding: 2% 5%;
    text-align: justify;
  }
`;

const Heading = styled.h1`
  font-size: var(--text-big);

  @media (max-width: 800px) {
    font-size: var(--text-big-mobile);
  }
`;

const SubHeading = styled.h2`
  font-size: var(--text-medium);
  font-weight: 300;
  margin-top: -10px;

  @media (max-width: 800px) {
    font-size: var(--text-medium-mobile);
    font-weight: 300;
    margin-top: -10px;
  }
`;

const PageHeading = props => {
  return (
    <PageHeadingContainer>
      <Heading>
        Invest now. Secure your principal. Get rewards in ETH or WBTC
      </Heading>
      <SubHeading>
        Smart Contract will automatically rebalance your investment between
        different protocols in order to maximise your returns.
      </SubHeading>
    </PageHeadingContainer>
  );
};

export default PageHeading;
