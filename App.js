import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import AddDeck from './components/AddDeck';
import { white, purple, lightPurp, gray} from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator , createStackNavigator} from 'react-navigation';
import middleware from './middleware';
import DeckView from './components/DeckView';
import DeckItem from './components/DeckItem';
import CreateCard from './components/CreateCard';
import Quize from './components/Quize';
import QuizeResult from './components/QuizeResult';
import { setLocalNotification } from './utils/notificationHelper';

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckItem,
      navigationOptions: {
        tabBarLabel: 'Decks'
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Create Deck',
      }
    },
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: gray,
      labelStyle: {fontSize: 16},
      style: {
        height: 56,
        backgroundColor: purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    }
  }
);

const MainNavigation = createStackNavigator({
  Home: {
    screen : Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  CreateCard:{
    screen: CreateCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quize: {
    screen: Quize,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  QuizeResult: {
    screen: QuizeResult,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
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
