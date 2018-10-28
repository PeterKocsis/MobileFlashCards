import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck';
import { white, purple } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator , createStackNavigator} from 'react-navigation';
import middleware from './middleware';

import DeckView from './components/DeckView';
import DeckItem from './components/DeckItem';
import CreateCard from './components/CreateCard';
import Quize from './components/Quize';
import QuizeResult from './components/QuizeResult';
import { setLocalNotification } from './utils/notificationHelper';

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckItem
  },
  AddDeck: {
    screen: AddDeck
  },
});

const MainNavigation = createStackNavigator({
  Home: {
    screen : Tabs
  },
  DeckView: {
    screen: DeckView
  },
  CreateCard:{
    screen: CreateCard
  },
  Quize: {
    screen: Quize
  },
  QuizeResult: {
    screen: QuizeResult
  },
});

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <MainNavigation />
      </Provider>
    );
  }
}
