import React from "react";
import styled from "styled-components";
import CAEth from "../components/CAEth";
import CAEWbtc from "../components/CAWbtc";
import CAEthWbtc from "../components/CAEthWbtc";

const Container = styled.div`
                        display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: space-between;
                      width: 92%;
                      padding: 2% 4% 0 4%;
                      overflow-x: scroll;
                      overflow-y: hidden;
                      -webkit-overflow-scrolling: touch;
  }
`;

const ActionCardContainer = props => {
  return (
    <Container>
      <CAEth />
      <CAEWbtc />
      <CAEthWbtc />
    </Container>
  );
};

export default ActionCardContainer;
