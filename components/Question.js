import React from 'react'
import { Provider, connect } from 'react-redux'
import Main from './Main.js'
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import { createBottomTabNavigator,History} from '@react-navigation/bottom-tabs';
import reducers from '../reducers';
import { formatQuestion } from '../actions/decks.js'
import styled from 'styled-components/native'

const Container=styled.TouchableOpacity`
    flex:1;
    padding:20px 0;
    justify-content:center;
    background-color:#f4f4f4;
    align-self:center;
    text-align: center;
    margin-bottom:5px;
    border: 1px solid;
    width: 40%;
`
const Filler = styled.View`
    padding:20px;
`
const QuestionContainer = styled.View`
borderColor: 1px solid red
`
const MainLabel = styled.Text`
font-size:24px;
text-align:center;
color: black;
`
const AnswerText = styled.Text`
font-size:18px;
text-align:center;
color: black;
font-weight: 400;
`
const Answer = styled.Text`
font-weight: 700;
`
const MainView = styled.View`
font-size:24px;
text-align:center;
color: black;
margin: 0 auto; 
`

class Question extends React.Component{ 
  handleClick = () =>{ 
    this.props.showButtons()
  }
  render(){
    const { answer, question, areButtonsVisible } = this.props
    
    return(
      <QuestionContainer>
        <MainLabel>{question}</MainLabel>
        <Filler />
        { !areButtonsVisible && <Filler /> }
        {areButtonsVisible && <AnswerText>The right answer is <Answer>{answer}</Answer></AnswerText> }
        { !areButtonsVisible &&<Container onPress ={ this.handleClick }>
          Show Answer
        </Container>
        }
      </QuestionContainer>
    )
  }
}


export default (Question)