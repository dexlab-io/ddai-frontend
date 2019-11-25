import React from "react";
import styled from "styled-components";
import Config from '../config';

const Container = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 0;
  /* background-color: #FFDC61; */
  background-color: ${props => props.bg};
  border: 1px solid;
  border-color: ${props => props.border};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;

  @media (max-width: 800px) {
    padding: 10px 14px;
    margin: 14px 0 8px 0;
    font-size: 0.7rem;
  }
`;

const Content = styled.span`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  @media (max-width: 800px) {
  }
`;

const Message = styled.p`

  @media (max-width: 800px) {
    
  }
`;

const Link = styled.a`
  font-weight: 700;
  margin: 0 10px;
  text-decoration: underline;
  @media (max-width: 800px) {
  }
`;


const Close = styled.a`
  font-weight: 700;
  /* transform: rotate(45deg); */
  @media (max-width: 800px) {
  }
`;


class Warning extends React.Component {

  state = {
    open: true
  }

  handleClick = (e) => {
    this.setState({
      open: false
    });
  }
  render() {
    if(!this.state.open || !this.props.recipe.warning) {
      return (
        null
      )
    }

    const {bg, border, message, link} = this.props.recipe.warning;

    return (
      <Container bg={bg} border={border} id="container">
        <Content>
          <Message>{message}</Message>
          <Link href={link} target='_blank'>Learn</Link>
        </Content>
        <Close onClick={this.handleClick}>✖️</Close>
      </Container>
    );
  }
  
}


export default Warning;
