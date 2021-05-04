import React from 'react'
import { Provider, connect } from 'react-redux'
import Main from './Main.js'
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native';
import {addDeck} from '../actions/decks.js'
import { createBottomTabNavigator,History} from '@react-navigation/bottom-tabs';
import reducers from '../reducers';
import  AsyncStorage  from '@react-native-community/async-storage'
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

class NewDeck extends React.Component{
    state ={
        value:'New deck',
        desc:'New Description'
    }
    handleChange=(event) =>{
        this.setState({value: event.target.value});
      }
    handleChangeDesc=(event) =>{
        this.setState({desc: event.target.value});
      }
    submitDeck =() =>{
      this.props.dispatch(addDeck(this.state.value, this.state.desc))

    }
  render(){
    return(
      <View>
          <Filler />
            <MainLabel>
                Name of deck:<br></br>
            </MainLabel>
               <Input><input type="text" value={this.state.value} onChange={this.handleChange} required/> </Input>
            <br></br>
            <MainLabel>
                Description of Deck:<br></br>
            </MainLabel>
            <Input><input type="text" value={this.state.desc} onChange={this.handleChangeDesc} required/></Input>
            <br></br>
            <Container onPress ={this.submitDeck}><Title>Submit new Deck</Title></Container>
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
)(NewDeck)