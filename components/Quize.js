import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/index';
import { StackActions } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { lightPurp, gray, orange, black, purple, blue, white, green, red } from './../utils/colors';

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
          <Text style={styles.title}>There is no card in the deck, please add some before you start the quize.</Text>
        </View>
      )
    }

    if(numberOfCards === this.state.cardIndex)
    {
      //This is a blank view which will be show only for a friction of second until the QuizeResult view will be visible
      return (
        <View style={styles.container}>
        </View>
      )
    }
    else{
      const questionCard = deck.questions[this.state.cardIndex];
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>{`${this.state.cardIndex + 1}/${numberOfCards}`}</Text>
            {this.state.showAnswer
              ? (
                <View style={{justifyContent:'space-between'}}>
                  <Text style={styles.title}>{questionCard.answer}</Text>
                  <TouchableOpacity style={local.flipCard} onPress={this.onCardFlip}><Text>Show Question</Text></TouchableOpacity>
                </View>
              )
              : (
                <View style={{justifyContent:'space-between'}}>
                  <Text style={styles.title}>{questionCard.question}</Text>
                  <TouchableOpacity style={local.flipCard} onPress={this.onCardFlip}><Text>Show Answer</Text></TouchableOpacity>
                </View>
              )
            }
          </View>
          <TouchableOpacity
            onPress={this.onCorrectAnswer}
            style={local.correct}>
              <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onIncorrectAnswer}
            style={local.incorrect}>
              <Text>Incorrect</Text>
          </TouchableOpacity>
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

local = StyleSheet.create({
  correct: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 7,
    height: 45,
    width: 150,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrect: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 7,
    height: 45,
    width: 150,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard : {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 7,
    height: 45,
    width: 150,
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


})
