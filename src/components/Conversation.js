import React, { useState } from "react";
import Section from "./Section";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import SectionButton from "./SectionButton";
import { Link, useRouter } from "./../util/router.js";

const Text = styled.span`
  font-size: 3em;
  color: black;
  font-weight: 700;
  margin-right: 15px;
  margin-top: 15px;
`;

const APR = styled.span`
  font-size: 3em;
  font-weight: 700;
  margin-right: 15px;
  color: #60E71F;
  margin-top: 15px;  
`;

const Container = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;


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
  -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
    /* border-bottom: 4px dotted #000; */
    text-decoration:underline;
    text-decoration-style: dotted;



  :focus {
    outline: none;
  }

  background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%);
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
  -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
    /* border-bottom: 4px dotted #000; */
    text-decoration:underline;
    text-decoration-style: dotted;



  :focus {
    outline: none;
  }

  background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%);
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
    appearance:none;
  }

  :focus::placeholder {
    color: transparent;    
  }

  input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;

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
    margin: 0;
    -moz-appearance:none; /* Firefox */
      -webkit-appearance:none; /* Safari and Chrome */
      appearance:none;
      /* border-bottom: 4px dotted #000; */
      text-decoration:underline;
      text-decoration-style: dotted;
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
    background: #F00093;
    border: solid 1px #fff;
    color: #fff; 
    border-radius: 5px;
      
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 32rem;
    font-size: 31px;
    font-weight: 700;

    @media (max-width: 980px) {
      max-width: 17rem;
    }

    @media (max-width:640px) {
      max-width: 15rem;
    }

    @media (max-width:460px) {
      max-width: 12rem;
    }
`;

function Conversation(props) {
  const [selectOpen, setSelectOpen] = useState(false);
  const router = useRouter();
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <Container>
          <Text>I </Text>
          <Text>want </Text>
          <Text>to </Text>
          <Text>gain </Text>
          {/* <TextLoop interval={500} className='textloop'>
            <Text>🤑 </Text>
            <Text>💳 </Text>
            <Text>💵 </Text>
            <Text>💶 </Text>
            <Text>💲 </Text>
            <Text>💹 </Text>                 
          </TextLoop> */}
          <APR>9,5% </APR>
          <Text>per year </Text>
          <Text>by depositing </Text>
          <Text>🏦 </Text>
          <Form>
            <Input
              type="number"
              value={props.amount}
              onChange={props.onChange}
              placeholder="100"
            ></Input>
          </Form>
          <DaiLogo src='../images/daiIcon.svg'></DaiLogo>
          <Text>DAI </Text>
          <Text>and </Text>
          <Text>automatically </Text>
          <Text>reinvest </Text>
          <Text>my </Text>
          <Text>earnings </Text>
          <Text>in</Text>
          <FormCustom>
            { !selectOpen ?
              <Button onClick={(e) => {
                e.preventDefault();
                setSelectOpen(true);
                }} >
                <TextLoop interval={800} className='textloop'>
                  <Text>ETH</Text>
                  <Text>ETH + BTC</Text>
                  <Text>GOLD</Text>
                  <Text>Short ETH x4</Text>
                  <Text>Repay Compound Loan</Text>
                  <Text>Long ETH x4</Text>        
                  <Text>Short ETH x4</Text>        
                  <Text>BTC + GOLD</Text>        
                  <Text>KNC</Text>        
                  <Text>Bitcoin</Text>
                  <Text>Long ETH + Short BTC</Text>
                  <Text>Long BTC + Short ETH</Text>

                </TextLoop>
              </Button>
            :
              <RecipesCustom name="token" id="currencies" className="icon-menu">
                <OptionCustom>ETH Maximalist</OptionCustom>
                  <OptionCustom>ETH + BTC</OptionCustom>
                  <OptionCustom>Repay Compound Loan</OptionCustom>

              </RecipesCustom>
            }
            </FormCustom>
        </Container>
        
        <Center>
          <CtaButton
                  parentColor={props.color}
                  size="normal"
                  onClick={() => {
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
