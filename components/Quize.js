import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/index';
import { StackActions, NavigationActions } from 'react-navigation';

class Quize extends Component {

  state = {
    cardIndex: 0,
    showAnswer: false,
    score: 0
  }

  onCardFlip = () => {
    this.setState((previousState) => ({
      showAnswer: !previousState.showAnswer
    }));
  }

  handleAnswer=(newState)=>{
    const {deck, numberOfCards, navigation} = this.props;
    Promise.resolve(
      this.setState({
        ...newState
      })
    )
    .then(()=>{
      const replaceAction = StackActions.replace({
        routeName: 'QuizeResult',
        params: {
          deckId: deck.title,
          score: this.state.score
        }
      })
      if(this.state.cardIndex === numberOfCards) {
        navigation.dispatch(replaceAction);
      }
    });
  }

  onCorrectAnswer = () => {
    const correAnswerState = {
      cardIndex: this.state.cardIndex + 1,
      showAnswer: false,
      score: this.state.score + 1
    };
    this.handleAnswer(correAnswerState);
  }

  onIncorrectAnswer = () => {
    const incorrectAnswerState = {
      cardIndex: this.state.cardIndex + 1,
      showAnswer: false,
      score: this.state.score
    };
    this.handleAnswer(incorrectAnswerState);
  }

  render() {
    const { deck, numberOfCards } = this.props;

    if(numberOfCards === 0) {
      return (
        <View style={styles.container}>
          <Text>Can not start quize, there is no card in the deck</Text>
        </View>
      )
    }

    if(numberOfCards === this.state.cardIndex)
    {
      //This is a blank view which will be show only for a friction until the QuizeResult view will be visible
      return (
        <View style={styles.container}>
        </View>
      )
    }
    else{
      const questionCard = deck.questions[this.state.cardIndex];
      return (
        <View style={styles.container}>
          <Text>{`${this.state.cardIndex + 1}/${numberOfCards}`}</Text>
          {this.state.showAnswer
            ? (
              <View>
                <Text>{questionCard.answer}</Text>
                <TouchableOpacity onPress={this.onCardFlip}><Text>Show Question</Text></TouchableOpacity>
              </View>
            )
            : (
              <View>
                <Text>{questionCard.question}</Text>
                <TouchableOpacity onPress={this.onCardFlip}><Text>Show Answer</Text></TouchableOpacity>
              </View>
            )
          }
          <TouchableOpacity onPress={this.onCorrectAnswer}><Text>Correct</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.onIncorrectAnswer}><Text>Incorrect</Text></TouchableOpacity>
        </View>
      )
    }
  }
}

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  const deck = decks[deckId];
  return {
    deck,
    numberOfCards: deck.questions.length,
    navigation
  }
}

export default connect(mapStateToProps)(Quize);