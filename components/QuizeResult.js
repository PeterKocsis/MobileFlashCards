import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './../styles/index';
import { StackActions } from 'react-navigation';
import { clearLocalNotification } from './../utils/notificationHelper';

class QuizeResult extends Component {

  componentDidMount(){
    clearLocalNotification();
  }

  onQuizeRestart=()=>{
    const {deck} = this.props;
    const replace = StackActions.replace({
      routeName : 'Quize',
      params : {
        deckId: deck.title
      }
    });

    this.props.navigation.dispatch(replace);
  }

  onBackToDeck=()=>{
    const popAction = StackActions.pop({
      n: 1,
    });

    this.props.navigation.dispatch(popAction);
  }

  render(){
    const {score, possibleMaxScore} = this.props;
    return(
      <View style={styles.container}>
        <Text>Your score is:</Text>
        <Text>{`${score}/${possibleMaxScore}`}</Text>
        <TouchableOpacity onPress={this.onQuizeRestart}><Text>Restart Quize</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.onBackToDeck}><Text>Back to Deck</Text></TouchableOpacity>
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
