import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text} from 'react-native';
import styles from './../styles/index';

class DeckView extends Component {
  render() {
    const {deck} = this.props;
    debugger
    return(
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{`Number of cards: ${deck.questions.length}`}</Text>
        <TouchableOpacity><Text>Add Card</Text></TouchableOpacity>
        <TouchableOpacity><Text>Start Quize</Text></TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}){
  const {deckId} = navigation.state.params;
  debugger
  return {
    deck : decks[deckId]
  }
}

export default connect(mapStateToProps)(DeckView);