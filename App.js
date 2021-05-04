import ReactDOM from 'react-dom'
import React from 'react'
import Main from './components/Main'
import Add from './components/AddQuestion'
import Quiz from './components/Quiz'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { TabView, SceneMap } from 'react-native-tab-view'
import { View, StyleSheet, Text , Platform,LogBox} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AddQuestion from './components/AddQuestion'
import { setLocalNotification } from './utils/helpers'


// Config for TabNav
const RouteConfigs = {
  
  AddNewDeck:{
    name: "Add Deck",
    component: NewDeck,
    options: { title: 'Add new Deck'}
  },
  Main:{
    name: "Main",
    component: Main,
    options: { title: 'Main'}

  }
}
const TabNavigatorConfig = {
  navigationOptions: {
    header: true
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
 
  const Tab = Platform.OS === 'ios'
  ? createBottomTabNavigator() 
  : createMaterialTopTabNavigator()
const TabNav = () =>
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['Main']} />
    <Tab.Screen {...RouteConfigs['AddNewDeck']} />
  </Tab.Navigator>
  //End of Tab Nav

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}

const StackConfig = {
  TabNav:{
    name: "TabNav",
    component: TabNav,
    options: {headerShown: false}
  },
  Main:{
    name: "Main",
    component: Main,
    options: {headerShown: false}
  }, 
  Decks:{
    name: "Decks",
    component: Decks,
    options: {headerShown: true}
  }, 
  Add:{
    name: "AddQuestion",
    component: AddQuestion,
    options: {headerShown: true }
  }, 
  Quiz:{
    name: "Quiz",
    component: Quiz,
    options: {headerShown: true }
  }, 
}

const Stack = createStackNavigator();
const MainNav = () =>(
    <Stack.Navigator {...StackNavigatorConfig}>
      <Stack.Screen {...StackConfig['TabNav']} />
      <Stack.Screen {...StackConfig['Main']} />
      <Stack.Screen {...StackConfig['Decks']} />
      <Stack.Screen {...StackConfig['Add']} />
      <Stack.Screen {...StackConfig['Quiz']} />
    </Stack.Navigator>
)

export default class App extends React.Component{
  componentDidMount() {
    setLocalNotification()
  }
  render(){
    const store = createStore(reducer,middleware)
    return(
      <Provider store={store}>
        <NavigationContainer>
         <MainNav />
        </NavigationContainer>
      </Provider>    
    )
  }
}