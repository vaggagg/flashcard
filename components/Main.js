import React from 'react'
import { Provider, connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import  NewDeck  from './NewDeck.js'
import { View, StyleSheet, Text , TouchableOpacity} from 'react-native'
import { createBottomTabNavigator,History} from '@react-navigation/bottom-tabs'
import reducers from '../reducers';
import styled from 'styled-components/native'
import  AsyncStorage  from '@react-native-community/async-storage'

const Container=styled.TouchableOpacity`
    flex:1;
    padding:60px 0;
    justify-content:center;
    background-color:#f4f4f4;
    align-items:center
    margin-bottom:5px;
    border: 1px solid;
`
const Filler = styled.View`
    padding:20px;
`
const Title=styled.Text`
font-size:20px;
text-align:center;
 color:red;
`
const MainTitle = styled.Text`
font-size:24px;
text-align:center;
color: black;
`

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    style: {
      height: 56,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
  };
 // Config for TabNav
 const RouteConfigs = {
  
  AddNewDeck:{
    name: "Add Deck",
    component: NewDeck,
    options: { title: 'Add new Deck'}
  }
}
 
const Tab = createBottomTabNavigator();
const TabNav = () =>
  <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs['AddNewDeck']} />
  </Tab.Navigator>
  //End of Tab Nav
class Main extends React.Component{
  componentDidMount() {
    fetchDecks().then((decks) => this.props.dispatch(receiveDecks(decks)))
  }
  render(){
    const {formattedDeck} = this.props;
    return(
      <View>
        <Filler ><MainTitle>Available Decks</MainTitle></Filler>
          {Object.keys(formattedDeck).map((key)=>{
            return <Container key= {key}
            onPress={() => this.props.navigation.navigate(
              'Decks',{ deck:formattedDeck[key], id: key }
            )}>
                <Title>{formattedDeck[key].name}({formattedDeck[key].Questions.length})</Title>
            </Container>
          })}
      </View>
    )
  }
}

function mapStateToProps (decks) {
  const formattedDeck = decks.decks
  return {
    formattedDeck
  }
}


export default connect(
  mapStateToProps,
)(Main)