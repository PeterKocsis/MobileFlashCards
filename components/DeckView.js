import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text} from 'react-native';
import styles from './../styles/index';
import { handleDeleteDeck } from '../actions';
import { StackActions, NavigationActions } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { lightPurp, gray, orange, black, purple, blue, white, green, red } from './../utils/colors';

class DeckView extends Component {

  onDeckDelete=()=>{
    const {dispatch, deck} = this.props;
    dispatch(handleDeleteDeck(deck.title));
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {deck, navigation} = this.props;
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{`Cards: ${deck.questions.length}`}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>navigation.navigate('CreateCard', {deckId: deck.title})}
            style={styles.button}
            ><Text style={styles.buttonText}>Add Card</Text></TouchableOpacity>
          <TouchableOpacity
            onPress={()=>navigation.navigate('Quize', {deckId: deck.title})}
            style={styles.button}
            ><Text style={styles.buttonText}>Start Quiz</Text></TouchableOpacity>
          <TouchableOpacity
            onPress={this.onDeckDelete}
            style={[styles.button, local.deleteButton]}>
              <Text style={{color: red, fontWeight: 'bold'}}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(decks, {navigation}){
  const {deckId} = navigation.state.params;
  return {
    deck : decks[deckId],
    navigation
  }
}

export default connect(mapStateToProps)(DeckView);

const local = StyleSheet.create({
  deleteButton: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 1,
  }
})