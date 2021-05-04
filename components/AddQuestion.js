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
  padding:25px 0;
  justify-content:center;
  margin: 0 60px; 
  background-color:#cab7ff;
  color: #fff; 
  align-items:center;
  margin-bottom:5px;
  border-radius: 10px; 
`
const Filler = styled.View`
    padding:20px;
`
const MainLabel = styled.Text`
font-size:24px;
text-align:center;
color: black;
`
const Title=styled.Text`
font-size:15px;
text-align:center;
 color:black;
 font-weight: 700
`
const Input = styled.View`
margin: 0 50px;
`

const MainView = styled.View`
font-size:24px;
text-align:center;
color: black;
margin: 0 auto;
`

class Add extends React.Component{
  state = { 
    question: "",
    answer:""
  }
  handleChange=(event) =>{
    this.setState({question: event.target.value});
  }
handleChangeDesc=(event) =>{
    this.setState({answer: event.target.value});
  }
submitDeck =() =>{
  const {deck, id} = this.props.route.params
    const formatVariables ={
      question: this.state.question,
      answer: this.state.answer,
      deck: deck,
      id: id
    }
    this.props.dispatch (formatQuestion(formatVariables))

}
  render(){
    return(
      <View>
          <Filler />
            <MainLabel>
                Question:<br></br>
            </MainLabel>
               <Input><input type="text" value={this.state.question} onChange={this.handleChange} required/> </Input>
            <br></br>
            <MainLabel>
                Right Answer:<br></br>
            </MainLabel>
            <Input><input type="text" value={this.state.answer} onChange={this.handleChangeDesc} required/></Input>
            <br></br>
            <Container onPress ={this.submitDeck}><Title>Submit new Question</Title></Container>
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
)(Add)