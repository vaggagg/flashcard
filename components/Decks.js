import React from 'react'
import { Provider, connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api';
import Main from './Main.js'
import AddQuestion from './AddQuestion.js'
import Quiz from './Quiz.js'
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import { createBottomTabNavigator,History} from '@react-navigation/bottom-tabs';
import reducers from '../reducers';
import styled from 'styled-components/native'

const Container1=styled.TouchableOpacity`
    flex:1;
    padding:25px 0;
    justify-content:center;
    margin: 0 20px; 
    background-color:#cab7ff;
    color: #fff; 
    align-items:center;
    margin-bottom:5px;
    border-radius: 10px; 
`
const Filler = styled.View`
    padding:20px;
`
const Title=styled.Text`
font-size:15px;
text-align:center;
 color:black;
 font-weight: 700
`
const MainTitle = styled.Text`
font-size:24px;
text-align:center;
color: black;
`
const MainText = styled.Text`
font-size:18px;
text-align: center;
color: red;
font-weight: 700; 
`
const ButtonsContainer = styled.View`
width:100%;
display: flex;
align-self: flex-end;
flex-direction:row;
`

const DeckContainer = styled.TouchableOpacity`
border: 1px solid green;
height:60%;
margin:0 50px;
`
const QuestionMark= styled.Text`
font-size:50px; 
text-align:center;
`
const Description = styled.Text`
font-size:13px;
color:blue;
text-align:center;
padding: 30px;
`

class Decks extends React.Component{
  state = {
    showQuestion: false
  }
  render(){
    const  { deck, id }  = this.props.route.params;
    const { showQuestion } = this.state;
    return (
      <View>
        <Filler ><MainTitle>{deck.name}</MainTitle></Filler>
        <DeckContainer 
        onMouseEnter={()=>this.setState({showQuestion:!this.state.showQuestion})}
        onMouseLeave={()=>this.setState({showQuestion:!this.state.showQuestion})}>
        {!showQuestion &&
        <View>
          <MainText>Number of questions: { deck.Questions.length }</MainText>
          <QuestionMark>?</QuestionMark>
        </View>
        }
        { showQuestion && <Description>{deck.Description}</Description> }
        </DeckContainer>
        <Filler ></Filler>
        <ButtonsContainer>
          <Container1 onPress={() => this.props.navigation.navigate(
              'Quiz',{ deck:deck}
            )}>
            <Title>Play Quiz</Title>
          </Container1>
          <Container1 onPress={() => this.props.navigation.navigate(
              'AddQuestion',{ deck:deck, id: id}
            )}>
            <Title>Add Question</Title>
          </Container1>
        </ButtonsContainer>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  const decksArray =[];
  const innerDecks= decks.decks
  for(let key in innerDecks)
    decksArray.push(innerDecks[key])
  return {
    decksArray
  }
}


export default connect(
  mapStateToProps,
)(Decks)