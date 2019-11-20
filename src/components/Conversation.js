import React, { useState } from "react";
import Section from "./Section";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import { useRouter } from "./../util/router.js";
import { cta } from "../mixpanel";

const Text = styled.span`
  font-size: 3em;
  color: black;
  font-weight: 700;
  margin-right: 15px;
  margin-top: 15px;
  @media (max-width: 800px) {
    font-size: 1.8rem;
    line-height: 2.6rem;
    text-align: center;
  }
`;

const APR = styled.span`
  font-weight: 700;
  color: #60e71f;
`;

const Container = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0;

  @media (max-width: 800px) {
    margin: 0 20px;
    line-height: 57px;
  }
`;

const Center = styled(Container)`
  display: flex;
  justify-content: center;
`;

const FormCustom = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  font-size: 16px;
  border: 0px;
  border: 0px solid #ffffff;
  border-radius: 5px;
  background-color: #ffffff;
  text-align: right;
  color: black;
  font-weight: 700;
  margin: 2px 0 0 -2px;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  /* border-bottom: 4px dotted #000; */
  text-decoration: underline;
  text-decoration-style: dotted;
  padding-left: 0px;
  :focus {
    outline: none;
  }
  @media (max-width: 800px) {
    margin: 0 0 0 0;
    padding: 0;
    font-size: 1.8rem;
    text-align: center;
    justify-content: center;
  }
`;

const RecipesCustom = styled.select`
  border: 0px solid #ffffff;
  border-radius: 5px;
  background-color: #ffffff;
  text-align: right;
  font-size: 3em;
  color: black;
  font-weight: 700;
  margin: 0;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  /* border-bottom: 4px dotted #000; */
  text-decoration: underline;
  text-decoration-style: dotted;

  :focus {
    outline: none;
  }

  background-image: linear-gradient(
    to right,
    black 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 16px 6px;
  background-repeat: repeat-x;
  max-width: 342px;
`;

const OptionCustom = styled.option`
  color: #000000;
`;

const DaiLogo = styled.img`
  width: 40px;
  margin-top: 2px;
  @media (max-width: 800px) {
    width: 30px;
  }
`;

const CtaButton = styled.button`
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  background: #f00093;
  border: solid 1px #fff;
  color: #fff;
  border-radius: 5px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* max-width: 32rem; */
  font-size: 31px;
  font-weight: 700;
`;

function Conversation(props) {
  const [selectOpen, setSelectOpen] = useState(false);
  const router = useRouter();
  return (
    // <Section color={props.color} size={props.size}>
      <div className="container">
        <Container>
          <Text>
            I want to earn up to <APR>10% </APR>per year by depositing 🏦
            $100&nbsp;
            <DaiLogo src="../images/daiIcon.svg"></DaiLogo>&nbsp;DAI and
            automatically reinvest my earnings in
            <FormCustom>
              {!selectOpen ? (
                <TextLoop interval={800} defaultStyle={0} className="textloop">
                  <Text>ETH</Text>
                  <Text>ETH + BTC</Text>
                  <Text>GOLD</Text>
                  <Text>Short ETH x4</Text>
                  <Text>Repay Compound</Text>
                  <Text>Long ETH x4</Text>
                  <Text>BTC + iETH</Text>
                  <Text>Short ETH x4</Text>
                  <Text>BTC + GOLD</Text>
                  <Text>KNC</Text>
                  <Text>Bitcoin</Text>
                  <Text>ETH + iBTC</Text>
                </TextLoop>
              ) : (
                <RecipesCustom
                  name="token"
                  id="currencies"
                  className="icon-menu"
                >
                  <OptionCustom>ETH Maximalist</OptionCustom>
                  <OptionCustom>ETH + BTC</OptionCustom>
                  <OptionCustom>Repay Compound</OptionCustom>
                </RecipesCustom>
              )}
            </FormCustom>
          </Text>
        </Container>

        <Center>
          <CtaButton
            parentColor={props.color}
            size="normal"
            onClick={() => {
              cta({
                position: "conversation",
                to: "/recipes",
                type: "button",
                label: "Start earning now"
              });
              router.push("/recipes");
            }}
          >
            Start earning now
          </CtaButton>
        </Center>
      </div>
    // </Section>
  );
}

export default Conversation;
