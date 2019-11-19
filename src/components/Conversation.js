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
`;

const APR = styled.span`
  font-size: 3.3em;
  font-weight: 700;
  margin-right: 15px;
  color: #60e71f;
  margin-top: 15px;
`;

const Container = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    margin: 0 20px;
    letter-spacing: -2px;
    line-height: 57px;
  }
`;

const Center = styled(Container)`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f2f2f2;
  text-align: right;
  margin-right: 15px;
  margin-top: 15px;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #f2f2f2;
    text-align: right;
  }
`;

const FormCustom = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-radius: 0px;
  background-color: #fff;
  text-align: right;
  margin-right: 15px;
  margin-top: 15px;

  @media (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-radius: 0;
    text-align: right;
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

const Input = styled.input`
  background: transparent;
  border: 0px;
  border-radius: 5px;
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
  max-width: 200px;

  ::placeholder,
  ::-webkit-input-placeholder {
    font-weight: 300;
    color: #000000;
  }

  :focus {
    outline: none;
    appearance: none;
  }

  :focus::placeholder {
    color: transparent;
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const DaiLogo = styled.img`
  width: 50px;
  margin-right: 15px;
`;

const Button = styled.button`
  background: transparent;
  border: 0px;
  border: 0px solid #ffffff;
  border-radius: 5px;
  background-color: #ffffff;
  text-align: right;
  font-size: 16px;
  color: black;
  font-weight: 700;
  margin: 5px 0 0 -2px;
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
  max-width: 32rem;
  font-size: 31px;
  font-weight: 700;
`;



function Conversation(props) {
  const [selectOpen, setSelectOpen] = useState(false);
  const router = useRouter();
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <Container>
          <Text>I want to earn up to </Text>
          {/* <TextLoop interval={500} className='textloop'>
            <Text>🤑 </Text>
            <Text>💳 </Text>
            <Text>💵 </Text>
            <Text>💶 </Text>
            <Text>💲 </Text>
            <Text>💹 </Text>                 
          </TextLoop> */}
          <APR>10% </APR>
          <Text>per year by depositing 🏦 $100</Text>
          {/* <Form>
            <Input
              type="number"
              value={props.amount}
              onChange={props.onChange}
              placeholder="100"
            ></Input>
          </Form> */}
          <DaiLogo src="../images/daiIcon.svg"></DaiLogo>
          <Text>DAI and automatically reinvest my earnings in </Text>
          <FormCustom>
            {!selectOpen ? (
              <Button
                onClick={e => {
                  e.preventDefault();
                  setSelectOpen(true);
                }}
              >
                <TextLoop interval={800} className="textloop">
                  <Text>ETH</Text>
                  <Text>ETH + BTC</Text>
                  <Text>GOLD</Text>
                  <Text>Short ETH x4</Text>
                  <Text>Repay Compound Loan</Text>
                  <Text>Long ETH x4</Text>
                  <Text>BTC + iETH</Text>
                  <Text>Short ETH x4</Text>
                  <Text>BTC + GOLD</Text>
                  <Text>KNC</Text>
                  <Text>Bitcoin</Text>
                  <Text>ETH + iBTC</Text>
                </TextLoop>
              </Button>
            ) : (
              <RecipesCustom name="token" id="currencies" className="icon-menu">
                <OptionCustom>ETH Maximalist</OptionCustom>
                <OptionCustom>ETH + BTC</OptionCustom>
                <OptionCustom>Repay Compound Loan</OptionCustom>
              </RecipesCustom>
            )}
          </FormCustom>
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
    </Section>
  );
}

export default Conversation;
