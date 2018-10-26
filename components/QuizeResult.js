import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './../styles/index';

class QuizeResult extends Component {
  render(){
    const {score, possibleMaxScore, navigation} = this.props;
    return(
      <View style={styles.container}>
        <Text>Your score is:</Text>
        <Text>{`${score}/${possibleMaxScore}`}</Text>
        <TouchableOpacity><Text>Restart Quize</Text></TouchableOpacity>
        <TouchableOpacity><Text>Back to Deck</Text></TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}) {
  const {score, deckId} = navigation.state.params;
  const deck = decks[deckId];
  return {
    deck,
    possibleMaxScore: deck.questions.length,
    score,
    navigation
  }
}

export default connect(mapStateToProps)(QuizeResult);
