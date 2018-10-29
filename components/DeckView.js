import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text} from 'react-native';
import styles from './../styles/index';
import { handleDeleteDeck } from '../actions';
import { StackActions, NavigationActions } from 'react-navigation';

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
          <Text>{deck.title}</Text>
          <Text>{`Number of cards: ${deck.questions.length}`}</Text>
        </View>
        <View>
        <TouchableOpacity
          onPress={()=>navigation.navigate('CreateCard', {deckId: deck.title})}
          style={styles.button}
          ><Text>Add Card</Text></TouchableOpacity>
        <TouchableOpacity
          onPress={()=>navigation.navigate('Quize', {deckId: deck.title})}
          style={styles.button}
          ><Text>Start Quize</Text></TouchableOpacity>
        <TouchableOpacity
          onPress={this.onDeckDelete}
          style={styles.button}><Text>Delete Deck</Text></TouchableOpacity>
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