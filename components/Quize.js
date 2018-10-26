import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/index';

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

  onCorrectAnswer = () => {
    const {numberOfCards, navigation, deck} = this.props;
    if(this.state.cardIndex < numberOfCards)
    {
      let currentIndex = this.state.cardIndex;
      this.setState((previousState) => ({
        cardIndex: previousState.cardIndex + 1,
        showAnswer: false,
        score: previousState.score + 1
      }));
      if(currentIndex +1 >= numberOfCards) {
        navigation.navigate('QuizeResult', {deckId: deck.title, score: this.state.score + 1});
      }
    }
  }

  onIncorrectAnswer = () => {
    const {numberOfCards, navigation, deck} = this.props;
    if(this.state.cardIndex < numberOfCards)
    {
      let currentIndex = this.state.cardIndex;
      this.setState((previousState) => ({
        cardIndex: previousState.cardIndex + 1,
        showAnswer: false,
      }));
      if(currentIndex +1 >= numberOfCards) {
        navigation.navigate('QuizeResult', {deckId: deck.title, score: this.state.score});
      }
    }
  }

  render() {
    const { deck, numberOfCards } = this.props;
    const questionCard = deck.questions[this.state.cardIndex];
    const cardUnavailable = questionCard ? false : true;
    debugger
    return (
      <View style={styles.container}>
        {cardUnavailable
          ? <Text>Can not start quize, there is no card in the deck</Text>
          : (
            <View>
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
            </View>)}
      </View>
    )
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