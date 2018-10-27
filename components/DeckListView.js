import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleReceiveDecks } from './../actions/index';
import { createStackNavigator } from 'react-navigation';
import DeckView from './DeckView';
import DeckItem from './DeckItem';
import CreateCard from './CreateCard';
import Quize from './Quize';
import QuizeResult from './QuizeResult';

const StackNavigation = createStackNavigator({
  Decks: {
    screen: DeckItem
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
  }
});

class DeckListView extends Component {

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }

  render() {
    return (
      <StackNavigation/>
    );
  }
}

export default connect()(DeckListView);