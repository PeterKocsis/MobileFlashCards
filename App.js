import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckListView from './components/DeckListView';
import { TabNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck';
import { white, purple } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation';
import middleware from './middleware';

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckListView
  },
  AddDeck: {
    screen: AddDeck
  },
});

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <Tabs />
      </Provider>
    );
  }
}
