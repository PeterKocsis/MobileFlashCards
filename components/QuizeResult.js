import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './../styles/index';
import { StackActions } from 'react-navigation';
import { clearLocalNotification } from './../utils/notificationHelper';

class QuizeResult extends Component {
  static navigationOptions = () => {
    return {
      title: 'Quiz Result'
    }
  }

  componentDidMount() {
    clearLocalNotification();
  }

  onQuizeRestart = () => {
    const { deck } = this.props;
    const replace = StackActions.replace({
      routeName: 'Quize',
      params: {
        deckId: deck.title
      }
    });

    this.props.navigation.dispatch(replace);
  }

  onBackToDeck = () => {
    const popAction = StackActions.pop({
      n: 1,
    });

    this.props.navigation.dispatch(popAction);
  }

  render() {
    const { score, possibleMaxScore } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Result:</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'green' }}>{`${((score / possibleMaxScore) * 100).toFixed(2)}%`}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={this.onQuizeRestart}><Text style={styles.buttonText}>Restart Quize</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onBackToDeck}><Text style={styles.buttonText}>Back to Deck</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  const { score, deckId } = navigation.state.params;
  const deck = decks[deckId];
  return {
    deck,
    possibleMaxScore: deck.questions.length,
    score,
    navigation
  }
}

export default connect(mapStateToProps)(QuizeResult);
