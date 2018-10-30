import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, Animated } from 'react-native';
import styles from './../styles/index';

class Deck extends Component {
  state = {
    bounceAnim: new Animated.Value(1),
  }

  onDeckSelection = (deck) => {
    const { navigation } = this.props;
    Animated.sequence([
      Animated.timing(this.state.bounceAnim, { duration: 200, toValue: 1.04 }),
      Animated.spring(this.state.bounceAnim, { toValue: 1, friction: 4 })
    ]).start(() => navigation.navigate('DeckView', { deckId: deck.title }))
  }

  render() {
    const { deck } = this.props;
    debugger
    return (
      <Animated.View style={{ transform: [{ scale: this.state.bounceAnim }] }}>
        <TouchableOpacity
          onPress={() => this.onDeckSelection(deck)}
          style={styles.card}>
          <Text style={styles.mainText}>{deck.title}</Text>
          <Text style={styles.text}>{`Cards: ${deck.questions.length}`}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

function mapStateToProps(decks, { nav, deckItem }) {
  debugger
  return {
    navigation: nav,
    deck: deckItem
  };
}

export default connect(mapStateToProps)(Deck);