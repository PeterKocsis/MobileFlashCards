import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import styles from './../styles/index';
import { handleReceiveDecks } from './../actions/index';
import Deck from './Deck';

class DeckItem extends Component {

  componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
  }

  renderItem = ({ item }) => {
    const { decks, navigation } = this.props;
    const deck = decks[item];
    debugger
    return (
      <Deck deckItem={deck} nav={navigation}></Deck>
    );
  }

  keyExtractor = (item, index) => {
    const { decks } = this.props;
    return decks[item].title;
  };

  render() {
    const { decks } = this.props;
    const noDeckinDecks = Object.getOwnPropertyNames(decks).length === 0;
    debugger
    return (
      <View style={styles.container}>
        {noDeckinDecks ? (<Text style={styles.title}>You can create your own deck on the "Create Deck" tab.</Text>)
          : <FlatList
            data={Object.keys(decks)}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}>
          </FlatList>}
      </View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  return {
    navigation,
    decks
  };
}

export default connect(mapStateToProps)(DeckItem);