import React from 'react'
import { Provider, connect } from 'react-redux'
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import Question from './Question'

import styled from 'styled-components/native'


const Right=styled.TouchableOpacity`
    flex:1;
    padding:20px 0;
    border-radius: 10px; 
    justify-content:center;
    background-color:#69c000;
    color: white;
    margin: 0 20px;
    font-weight: 700;
    align-items:center
    margin-bottom:5px;
`
const Wrong=styled.TouchableOpacity`
    flex:1;
    padding:20px 0;
    margin: 0 20px; 
    border-radius: 10px; 
    justify-content:center;
    background-color:#ca0003;
    font-weight: 700;
    color: white;
    align-items:center
    margin-bottom:5px;
`
const Filler = styled.View`
    padding:20px;
`
const ButtonsContainer = styled.View`
width:100%;
display: flex;
flex-direction:row;
`
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
const MainLabel = styled.Text`
font-size:24px;
text-align:center;
color: black;
`
const ButtonText = styled.Text`
color: #fff;
font-weight: 700;
`
const ButtonText1 = styled.Text`
color: black;
font-weight: 700;
`
const MainView = styled.View`
font-size:24px;
text-align:center;
color: black;
margin: 0 auto;
`

class Quiz extends React.Component{
  state = { 
    score: 0, 
    tries: 0,
    question:this.props.route.params.deck.Questions[0].Question,
    answer:this.props.route.params.deck.Questions[0].Answer,
    showButtons: false,
    showScore: false
  }

nextQuestion = () => {
    const { showScore, description, answer, tries } = this.state;
    const { Questions} = this.props.route.params.deck
    if (!showScore)
    this.setState ({ question: Questions[tries].Question,
                    answer: Questions[tries].Answer})
}
isEndOfQuiz = () => {
    const length = this.props.route.params.deck.Questions.length 
    if(this.state.tries === length )
      this.setState({showScore: true })
    else
      this.nextQuestion()
}
replyQuiz = () => {
  this.setState ({
    score: 0,
    tries: 0,
    question:this.props.route.params.deck.Questions[0].Question,
    answer:this.props.route.params.deck.Questions[0].Answer,
    showButtons: false,
    showScore: false
  })
}
rightAnswer = async() => {
    await this.setState({ score: this.state.score + 1,
                    tries: this.state.tries + 1,
                    showButtons: !this.state.showButtons
                 })
    this.isEndOfQuiz()
}
wrongAnswer = async () => {
    await this.setState({ tries: this.state.tries + 1 ,
        showButtons: !this.state.showButtons
                  })
    this.isEndOfQuiz()
}
showButtons = () => {
  this.setState ({ showButtons: !this.state.showButtons})
} 
  render(){
    const { answer, question , score, tries, showScore,showButtons } = this.state
    const QuestionsArray = this.props.route.params.deck.Questions
    const displayedScore = tries === 0 ? 0 : (score/tries)*100
    const message = displayedScore > 50 ? 'You passed the quiz' : 'You did not pass the quiz'
    return(
      <View>
          <Filler />
            { showScore && 
              <View> 
                <MainLabel>Your final score is { displayedScore } % </MainLabel>
                <MainLabel>{message}</MainLabel>
                <ButtonsContainer>
                <Container1 onPress ={this.replyQuiz}><ButtonText1>Replay Quiz</ButtonText1></Container1>
                <Container1 onPress ={() => this.props.navigation.goBack() }><ButtonText1>Go back to deck</ButtonText1></Container1>
                </ButtonsContainer>
              </View>
            }
            <br></br>
            {!showScore &&
              <View>
                <Question question= { question } answer ={ answer } showButtons={this.showButtons} areButtonsVisible={this.state.showButtons}/>
                {showButtons &&
                <ButtonsContainer>
                  <Right onPress ={this.rightAnswer}><ButtonText>Right answer</ButtonText></Right>
                  <Wrong onPress ={this.wrongAnswer}><ButtonText>Wrong answer</ButtonText></Wrong>
                </ButtonsContainer>
                }
                <MainLabel>Questions {tries+1}/{QuestionsArray.length} </MainLabel>
                <MainLabel>Score { displayedScore } % </MainLabel>
              </View>
            }
            <Filler />
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
)(Quiz)